"use client";
import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "@/components/checkout/CardSection";
import { FaCircleNotch } from "react-icons/fa6";
import { PackagesProps } from "@/types/packages";
import { useRouter } from "next/router";
import { Button } from "../ui/button";
import { CgSpinner } from "react-icons/cg";

// Function to handle the token from Stripe
async function stripeTokenHandler(
  token: any,
  packPrice: string,
  userId: string
) {
  const paymentData = {
    token: token.id,
    pack_price: packPrice,
    userId,
  };

  const res = await fetch("/api/charge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  return await res.json();
}

interface Pack {
  pack: PackagesProps;
  userId: string;
}

const CheckoutForm: React.FC<Pack> = ({ pack, userId }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5); // 5 seconds countdown
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (success && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      window.location.href = "/dashboard";
    }

    return () => clearInterval(timer);
  }, [success, countdown]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card) {
      const result = await stripe.createToken(card);

      if (result.error) {
        console.error(result.error.message);
      } else {
        setLoading(true);
        const res = await stripeTokenHandler(
          result.token,
          pack.price.toString(),
          userId
        );

        if (res.id) {
          setLoading(false);
          setSuccess(true);
        } else {
          console.error("Payment error:", res);
        }
      }
    }
  };

  return (
    <div className="max-w-full xl:max-w-[50%] mx-auto flex w-full flex-col space-y-10">
      {success ? (
        <SuccessMessage countdown={countdown} />
      ) : (
        <>
          <OrderSummary pack={pack} />
          <PaymentForm
            onSubmit={handleSubmit}
            loading={loading}
            stripe={stripe}
          />
        </>
      )}
    </div>
  );
};

// Component for displaying success message
const SuccessMessage: React.FC<{ countdown: number }> = ({ countdown }) => (
  <div className="flex w-full border-l-6 border-[#009ef7] bg-[#f1faff] bg-opacity-[15%] dark:bg-[#f1faff] px-7 py-8 shadow-md md:p-9">
    <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#009ef7]">
      <svg
        width="16"
        height="12"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
          fill="white"
          stroke="white"
        />
      </svg>
    </div>
    <div className="w-full flex flex-col space-y-2">
      <h5 className="text-lg font-bold text-black dark:text-[#009ef7]">
        Payment Success
      </h5>
      <p className="text-base leading-relaxed text-body">
        Your payment was processed successfully.
      </p>
      <p className="text-base leading-relaxed text-body">
        You are being redirected to the dashboard in {countdown} seconds.
      </p>
    </div>
  </div>
);

// Component for displaying order summary
const OrderSummary: React.FC<{ pack: PackagesProps }> = ({ pack }) => (
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white">Order Summary</h3>
    </div>
    <div className="p-4 md:p-6 xl:p-9">
      <h3 className="text-black dark:text-white font-bold text-3xl xl:text-title-xxl mb-0">
        ${pack.price}
      </h3>
      <h4 className="text-black dark:text-white font-medium text-2xl mb-2.5">
        {pack.name}
      </h4>
    </div>
  </div>
);

// Component for displaying payment form
const PaymentForm: React.FC<{
  onSubmit: (event: React.FormEvent) => void;
  loading: boolean;
  stripe: any;
}> = ({ onSubmit, loading, stripe }) => (
  <div className="rounded-sm border border-stroke py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark p-4">
    <div className="checkoutCard">
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <CardSection />
        </div>
        <button
          className={`inline-flex w-full items-center justify-center rounded-md bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 ${
            !stripe || loading ? "opacity-50" : ""
          }`}
          disabled={!stripe || loading}
        >
          {loading ? <CgSpinner className="animate-spin w-8 h-8" /> : "Pay"}
        </button>
      </form>
    </div>
  </div>
);

export default CheckoutForm;
