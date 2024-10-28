import * as z from 'zod';
export const categorySchema = z.object({
	category_name: z
		.string({ required_error: 'Category Name is required' })
		.min(3, { message: 'Category Name must be at least 3 characters' })
		.max(100, { message: 'Category Name must be less than 100 characters' })
});