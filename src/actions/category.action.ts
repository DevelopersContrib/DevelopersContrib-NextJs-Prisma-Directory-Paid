'use server';

import CategoryType from '@/types/category.type';
import prismadb from '@/lib/prismaDb';

export const categoryAction = async (category_id:string, category_name:string) => {
	try {
		const exist = await prismadb.category.findUnique({
            where: {
                category_id: category_id,
            },
          });
		
		if(exist){
			const category = await prismadb.category.update({
				where: {
					category_id: category_id,
				},
				data: {
					category_name
				},
			});
			
			return {
				data: category,
				category_id: category.category_id,
				message: 'Category updated successfully',
			};
		}else{
			const category = await prismadb.category.create({
				data: {
					category_name
				},
			});
			
			return {
				data: category,
				category_id: category_id,
				message: 'Category added successfully',
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