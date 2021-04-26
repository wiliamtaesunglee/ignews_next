import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "stream"
import Stripe from "stripe"
import { stripe } from "../../services/stripe"
import { saveSubscription } from "./_lib/manageSubscription"

const EVENT_COMPLETED = 'checkout.session.completed'
const EVENT_CREATED = 'customer.subscription.created'
const EVENT_UPDATED = 'customer.subscription.updated'
const EVENT_DELETED = 'customer.subscription.deleted'

async function buffer(readable: Readable) {
  const chunks = []

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    )
  }

  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false
  }
}

const relevantEvents = new Set([
  EVENT_COMPLETED,
  EVENT_CREATED,
  EVENT_UPDATED,
  EVENT_DELETED
])

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buff = await buffer(req)
    const secret = req.headers['stripe-signature']

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buff, secret, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
      return res.status(400).send(`Webhook-error: ${error.message}`)
    }

    const { type } = event

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case EVENT_CREATED:
          case EVENT_UPDATED:
          case EVENT_DELETED:
            const subscription = event.data.object as Stripe.Subscription

            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              type === EVENT_CREATED,
            )

            break;
          case EVENT_COMPLETED: 
            const checkoutSession = event.data.object as Stripe.Checkout.Session

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString()
            )

            break;
          default:
            throw new Error('Unhandled Event')
        }
      } catch (error) {
        return res.json({ error: 'Webhook handler fail' })
      }
    }
    
    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}
