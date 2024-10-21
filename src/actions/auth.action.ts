'use server';

import { IRegister, IAccountInfo } from '@/interfaces/auth.interface';
import prismadb from '@/lib/prismaDb';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';
import axios from 'axios'

export const authRegisterAction = async ({
	name,
	email,
	password,
	path,
	domain,
}: IRegister) => {
	try {
		const emailAlreadyExists = await prismadb.user.findFirst({
			where: {
				email,
			},
		});

		if (emailAlreadyExists) {
			return {
				data: null,
				message: 'Email already exists',
			};
		}

		const user = await prismadb.user.create({
			data: {
				name,
				email,
				password: await hash(password, 10),
				domain
			},
		});

		let saveLead: string = "";

		const lead_api: string = (process.env.LEAD_API as string);
		if(lead_api){
			const params = new URLSearchParams();
			params.append('domain', domain);
			params.append('email', email);

			try {
				const saveLeads = await axios.post(lead_api, params);
				saveLead = saveLeads.data;
			} catch (error) {
				
			}
		}

		return {
			data: user,
			id: user.id,
			message: 'User created successfully',
			saveLead: saveLead
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

export const getAccountInfo = async (id: string|'0'|undefined) => {

	const account = await prismadb.user.findUnique({
	  where: {
		id: id,
	  }
	});
  
	return account;
	
  };