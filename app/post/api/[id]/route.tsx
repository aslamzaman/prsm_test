import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';



export const GET = async (request:Request, {params}:any) => {
    try {
        const {id} = params;
        const post = await prisma.post.findUnique({
            where:{
                id: id
            }
        });
        if(!post){
            return NextResponse.json(
                {message:"Poset not found!"},
                {status:404}
            )
        }
        return NextResponse.json(post);
    } catch (err) {
        return NextResponse.json({message:"GET Error", err},{status: 500});
    }
}



export const PATCH = async (request:Request, {params}:any) => {
    try {
        const body = await request.json();
        const { name, short_name } = body;
        const {id} = params;
        const updatePost = await prisma.post.update({
           where: {
                id:id
            },
            data: {
                name,
                short_name
            }
        });

        if(!updatePost){
            return NextResponse.json(
                {message:"Poset not found!"},
                {status:404}
            )
        }
        return NextResponse.json(updatePost);
       
    } catch (err) {
        return NextResponse.json({message:"Update Error", err},{status: 500});
    }
}




export const DELETE = async ({params}: any) => {
    try {
        const {id} = params;
        await prisma.post.delete({
            where:{
                id: id
            }
        });
       
        return NextResponse.json("Post has been deleted");
    } catch (err) {
        return NextResponse.json({message:"Delete Error", err},{status: 500});
    }
}
