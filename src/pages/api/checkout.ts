import { stripe } from "@/src/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  priceId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productsToBuy } = req.body;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
  }

  if (!productsToBuy) {
    res.status(400).json({ error: "Products not found." });
  }

  const successUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: productsToBuy.map((prod: ProductType) => {
      return {
        price: prod.priceId,
        quantity: 1,
      };
    }),
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
