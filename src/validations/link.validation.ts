import { url } from 'inspector';
import * as z from 'zod';

export const createLinkSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(225, { message: 'Title must be less than 100 characters' }),
	categoryId: z.string().min(1, { message: 'Category is required' }),
	description: z.string().min(10, { message: 'Description is required' }),
	company_name: z.string().min(2, { message: 'Company name is required' }),
	company_logo: z.string().min(10, { message: 'Company logo is required' }),
	screenshot: z.string().min(10, { message: 'Screenshot is required' }),
    url: z.string().min(5, { message: 'Url is required' }),
	userId: z.string().min(1),
});

export const updatePostBodySchema = z.object({
	id: z.string().min(1, { message: 'Id is required' }),
	body: z.string(),
    title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(225, { message: 'Title must be less than 100 characters' }),
	categoryId: z.string().min(1, { message: 'Category is required' }),
	description: z.string().min(10, { message: 'Description is required' }),
	company_name: z.string().min(2, { message: 'Company name is required' }),
	company_logo: z.string().min(10, { message: 'Company logo is required' }),
	screenshot: z.string().min(10, { message: 'Screenshot is required' }),
    url: z.string().min(5, { message: 'Url is required' }),
});
