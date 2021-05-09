import Prismic from '@prismicio/client'

export const  getPrismiClient = (req?: unknown) => {
  const prismic = Prismic.client(
    process.env.PRISMIC_URL,
    {
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  )

  return prismic
}