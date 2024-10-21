'use server';

import { IPayment } from '@/interfaces/payment.interface';
import prismadb from '@/lib/prismaDb';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';


export const paymentAction = async ({
    userId,
    amount,
    payment_type,
    stripe_charge_id,
    stripe_payment_status,
    stripe_receipt_url,
    description,
    result_json,
    other_info,
    path
}: IPayment) => {
	try {
		
		const payment = await prismadb.payment.create({
			data: {
				userId,
                amount,
                payment_type,
                stripe_charge_id,
                stripe_payment_status,
                stripe_receipt_url,
                description,
                result_json,
                other_info     
        
    
          },
			
		});

		
		
		return {
			data: payment,
			message: 'Payment created successfully',
		
		};
	} catch (error) {
		console.info('[ERROR_AUTH_REGISTER]', error);

		return {
			data: null,
			message: 'Something went wrong',
		};
	} finally {
		revalidatePath(path);
	}
};
