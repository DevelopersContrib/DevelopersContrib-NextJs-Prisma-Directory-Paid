import * as z from 'zod';
export const domainSettingsSchema = z.object({
	title: z
		.string({ required_error: 'Title is required' })
		.min(3, { message: 'Title must be at least 3 characters' })
		.max(100, { message: 'Title must be less than 100 characters' }),
	logo: z
		.string({ required_error: 'Logo is required' })
		.url({ message: 'Enter valid url' }),
	description: z
		.string({ required_error: 'Description is required' })
		.min(3, { message: 'Description must be at least 3 characters' }),
    price: z
        .number({ required_error: 'Numeric is required' }),
});