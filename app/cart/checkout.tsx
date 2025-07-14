"use client";

import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import {
  Appearance,
  loadStripe,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE!);

export default function Checkout({
  clientSecret,
  darkTheme = false,
}: {
  clientSecret: string;
  darkTheme: boolean;
}) {
  const appearance: Appearance = {
    theme: darkTheme ? "night" : "stripe",
  };
  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm />
    </Elements>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });
    if (result.error) {
      console.log(result.error.message);
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion",
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={paymentElementOptions} />
      <br />
      <button
        className="btn btn-success w-full"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <a>Pay now</a>
      </button>
    </form>
  );
}
