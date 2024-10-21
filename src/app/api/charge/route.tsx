//https://sultanoveli.medium.com/how-to-add-stripe-payments-to-your-next-js-app-d1cfced7c8a5
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/utils/auth-options";
import { paymentAction } from "@/actions/payment.action";
import { historyAction } from "@/actions/history.action";

import axios from "axios";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    const data = await req.json();
    const amount = Math.round(data.pack_price);
    const userId = data.userId;
    console.log('data', data);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
      });

      const data = {
        userId: userId,
        amount: 9,
        payment_type: "stripe",
        stripe_charge_id: paymentIntent.id,
        stripe_payment_status: paymentIntent.status,
        stripe_receipt_url:"",
        description: "Lifetime Subscription",
        result_json: JSON.stringify(paymentIntent),
        other_info: JSON.stringify(paymentIntent),
        path: '/checkout',
      };

      const res = await paymentAction(data);
      if (res.message === "Payment created successfully") {

        const historydata = {
          message: "has subscribed to lifetime plan",
          userId: userId,
          link: '/checkout',
          path: '/checkout',
        };
        
        const hres = await historyAction(historydata);
        return NextResponse.json(res.data, { status: 200 });
      }


      

      return NextResponse.json(res.data, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return new NextResponse(error, {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
