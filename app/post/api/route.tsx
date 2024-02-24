import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const posts = await prisma.post.findMany();
        return NextResponse.json({ posts })
    } catch (err) {
        return NextResponse.json({message:"GET Error", err},{status: 500});
    }
}


export const POST = async (request: Request) => {
    try {
        const body = await request.json();
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




