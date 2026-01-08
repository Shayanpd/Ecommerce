import db from "@/src/db/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from 'resend';
import PurchaseReceiptEmail from "../../email/PuchaseReceipt";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  // ✅ Define variables first
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let stripeEvent: Stripe.Event;

  try {
    stripeEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (stripeEvent.type === "charge.succeeded") {
    const charge = stripeEvent.data.object as Stripe.Charge;


    const payload = Promise.resolve({
      productId: charge.metadata.productId,
      email: charge.billing_details.email,
      pricePaidInCents: charge.amount,
    });

    const { productId, email, pricePaidInCents } = await payload;

    if(productId == null || email == null) return new NextResponse("Bad Request", {status: 400})

    const product = await db.product.findUnique({where: {id: productId}})

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const userFields = {
    email,
    orders: {create: {productId, pricePaidInCents}},
  }

  const { orders: [order] } = await db.user.upsert({ 
    where: {email},
    create: userFields,
    update: userFields,
    select: {orders: {orderBy: {createdAt: "desc"}, take: 1}}
    })

    const downloadVerification = await db.downloadVerification.create({data: {productId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }})

    console.log("EMAIL:", charge.billing_details.email);

    await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Order Confirmation",
        react: <PurchaseReceiptEmail order={order} product={product} downloadVerificationId={downloadVerification.id}/>
    })
}
  return new NextResponse("Event received", { status: 200 });
}