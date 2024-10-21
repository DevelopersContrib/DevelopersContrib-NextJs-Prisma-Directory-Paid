'use server';

import { ILinkVotesUp } from '@/interfaces/like.interface';
import prismadb from '@/lib/prismaDb';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';


export const likeAction = async ({
	LinkId,
	userId,
	path
}: ILinkVotesUp) => {
	try {
		
		const like = await prismadb.linkVotesUp.create({
			data: {
				LinkId,
				userId,
			},
			
		});

		
		
		return {
			data: like,
			message: 'Like created successfully',
		
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


export const countLikesAction = async (LinkId: string, path: string) => {
	try {
		
		const count = await prismadb.linkVotesUp.count({
			where: {
				LinkId,
			},
		});

		
		return {
			data: count,
			message: 'Like counted successfully',
		
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