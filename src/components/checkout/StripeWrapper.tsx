'use client'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { StripePackage } from "@/types/stripe";

// Docs:: https://stripe.com/docs/payments/accept-a-payment-charges?client=react

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
const StripeWrapper: React.FC<StripePackage> = ({ pack,userId }) => {
 
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm pack={pack} userId={userId} />
    </Elements>
  );
};

export default StripeWrapper;