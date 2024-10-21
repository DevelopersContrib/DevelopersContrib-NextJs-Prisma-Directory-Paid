import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const data = await req.json();    
    if(data.id){
        try {
            const user = await prisma.user.update({
                where: {
                    id: data.id,
                },
                data: {
                  name:data.name,
                  email:data.email,
                  password:data.password,
                },
              });
            return new Response(JSON.stringify({id:data.id}), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({ message: 'Error updating user info' }), { status: 200 });  
        }
    }    
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 200 });    
};