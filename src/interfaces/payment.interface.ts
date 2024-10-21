export interface IPayment {
	userId: string | undefined;
    amount: number;
    payment_type: string;
    stripe_charge_id: string;
    stripe_payment_status: string;
    stripe_receipt_url: string;
    description: string;
    result_json: string;
    other_info: string; 
    path: string;
}
