import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
      const posts = await prisma.post.findMany();
      return NextResponse.json({ posts });
    } catch (error) {
      console.error('GET Error:', error);
      return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
    }
  }



export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { name, short_name } = body;
        const newPost = await prisma.post.create({
            data: {
                name,
                short_name
            }
        });
         return NextResponse.json(newPost);
       
    } catch (err) {
        return NextResponse.json({message:"POST Error", err},{status: 500});
    }
}




