import { query } from "faunadb"
import { fauna } from "../../../services/fauna"
import { stripe } from "../../../services/stripe"

export const saveSubscription = async (
  subscriptionId: string,
  customerId: string,
  createdAction = false,
) => {
  const userRef = await fauna.query(
    query.Select(
      'ref',
      query.Get(
        query.Match(
          query.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  )

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  if (createdAction) {
    await fauna.query(
      query.Create(
        query.Collection('subscriptions'),
        { data: subscriptionData }
      )
    )
  } else {
    try {
      await fauna.query(
        query.Replace(
          query.Select(
            'ref',
            query.Get(
              query.Match(
                query.Index('subscription_by_id'),
                subscriptionId,
              )
            )
          ),
          {
            data: subscriptionData
          }
        )
      )
    } catch (err) {
      console.warn(err)
    }

  }
}