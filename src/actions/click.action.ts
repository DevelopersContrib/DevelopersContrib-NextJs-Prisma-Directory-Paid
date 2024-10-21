'use server';

import { ILinkClicks } from '@/interfaces/click.interface';
import prismadb from '@/lib/prismaDb';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';


export const clickAction = async ({
	LinkId,
    path
}: ILinkClicks) => {
	try {
		
		const click = await prismadb.linkClicks.create({
			data: {
				LinkId,
			},
			
		});

		
		
		return {
			data: click,
			message: 'Click created successfully',
		
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


export const countClicksAction = async (LinkId: string, path: string) => {
	try {
		
		const count = await prismadb.linkClicks.count({
			where: {
				LinkId,
			},
		});

		
		return {
			data: count,
			message: 'Click counted successfully',
		
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