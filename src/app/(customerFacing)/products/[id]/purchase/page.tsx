export const runtime = "nodejs"
import db from "@/src/db/db"
import { notFound } from "next/navigation"
import Stripe from "stripe"
import { CheckoutForm } from "./_components/CheckoutForm"

// Stripe instance (you can also move this inside the function if you want)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

// Change props type so params is a Promise
type PurchasePageProps = {
  params: Promise<{ id: string }>
}

export default async function PurchasePage({ params }: PurchasePageProps) {
  // Await params like in your download page
  const { id } = await params

  // Validate id
  if (!id) throw new Error("Product ID is missing!")

  // Fetch product
  const product = await db.product.findUnique({ where: { id } })
  if (!product) return notFound()

  // Create Stripe PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id },
  })

  if (!paymentIntent.client_secret) {
    throw new Error("Stripe failed to create payment intent")
  }

  // Return client component
  return <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />
}