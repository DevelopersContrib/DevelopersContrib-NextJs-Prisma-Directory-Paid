'use server';

import {ISettings } from '@/interfaces/domain.interface';
import prismadb from '@/lib/prismaDb';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';
import axios from 'axios'

export const getSettings = async () => {
    const count = await prismadb.settings.count();
    if(count>0){
        return await prismadb.settings.findFirst();
    }
    return null;
};


export const domainSettingsAction = async ({
    id,
	title,
	logo,
	description,
	price,
}: ISettings) => {
	try {

		const count = await prismadb.settings.count();
		console.log('count',count);
		if(count>0){
			const settings = await prismadb.settings.update({
				where: {
					id: id,
				},
				data: {
					title,
					logo,
					description,
					price
				},
			});
			
			return {
				data: settings,
				id: settings.id,
				message: 'Domain Settings updated successfully',
			};
		}else{
			const settings = await prismadb.settings.create({
				data: {
					title,
					logo,
					description,
					price
				},
			});
			
			return {
				data: settings,
				id: settings.id,
				message: 'Domain Settings updated successfully',
			};
		}
	} catch (error) {
		console.info('[ERROR_AUTH_REGISTER]', error);

		return {
			data: null,
			message: 'Something went wrong',
		};
	} finally {
		
	}
};