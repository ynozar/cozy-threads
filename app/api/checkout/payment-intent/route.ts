import Stripe from "stripe";
import { CartItem } from "@/lib/cartHelper";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {});
export async function POST(req: Request) {
  const cart: CartItem[] = await req.json();

  let total = 0;
  let quantity = 0;
  const resp = await stripe.prices.list();
  const prices = new Map(resp.data.map((i) => [i.id, i]));
  cart.forEach((e) => {
    const price = prices.get(e.price_id);
    if (!price || !price.unit_amount) {
      return new Response("Product/Price Not Found", {
        status: 400,
      });
    }
    total += price.unit_amount * e.quantity;
    quantity += e.quantity;
  });
  console.log(total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: total,
      automatic_payment_methods: { enabled: true },
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      total: total,
      quantity: quantity,
    });
  } catch {
    return new Response("Bad Request", {
      status: 400,
    });
  }
}
