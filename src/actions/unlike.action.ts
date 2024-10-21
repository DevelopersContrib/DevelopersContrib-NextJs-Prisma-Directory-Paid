'use server';

import { ILinkVotesDown } from '@/interfaces/unlike.interface';
import prismadb from '@/lib/prismaDb';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';


export const unlikeAction = async ({
	LinkId,
	userId,
	path
}: ILinkVotesDown) => {
	try {
		
		const like = await prismadb.linkVotesDown.create({
			data: {
				LinkId,
				userId,
			},
			
		});

		
		
		return {
			data: like,
			message: 'Unlike created successfully',
		
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


export const countUnlikesAction = async (LinkId: string, path: string) => {
	try {
		
		const count = await prismadb.linkVotesDown.count({
			where: {
				LinkId,
			},
		});

		
		return {
			data: count,
			message: 'Unlike counted successfully',
		
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