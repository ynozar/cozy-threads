import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {});
export async function GET() {
  try {
    const products = await stripe.products.list({
      limit: 100,
    });

    return Response.json(products);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error fetching products" },
      {
        status: 404,
      },
    );
  }
}
