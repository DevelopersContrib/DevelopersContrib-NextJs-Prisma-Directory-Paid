import { PackagesProps } from "@/types/packages";
import  PaymentType  from "@/types/payment.type";

export type StripePackage = {
    id: string;
    pack:PackagesProps;
    userId: string;
};

export type StripeInvoice = {
    id: string;
    pack:PaymentType
};