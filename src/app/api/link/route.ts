import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const data = await req.json();
    
    if(data.id){
        try {
            const link = await prisma.link.findUnique({
                where: {
                    id: data.id,
                },
            });
    
            if (!link) {
                return new Response(JSON.stringify({ message: 'Link not found' }), { status: 200 }); 
            }
            return new Response(JSON.stringify(link), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Error fetching product' }), { status: 200 });  
        }
    }    
    return new Response(JSON.stringify({ message: 'Link not found' }), { status: 200 });    
};