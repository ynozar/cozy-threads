import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {});
export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ price: string }>;
  },
) {
  const { price } = await params;

  try {
    const productPrice = await stripe.prices.retrieve(price);

    return Response.json(productPrice);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Error fetching Price" },
      {
        status: 404,
      },
    );
  }
}
