'use server';

import { IHistory } from '@/interfaces/history.interface';
import prismadb from '@/lib/prismaDb';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';


export const historyAction = async ({
	message,
	userId,
	link,
    path
}: IHistory) => {
	try {
		
		const history = await prismadb.history.create({
			data: {
				message,
				userId,
				link,
			},
			
		});

		
		
		return {
			data: history,
			message: 'History created successfully',
		
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
