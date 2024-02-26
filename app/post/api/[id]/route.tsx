import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';

export const GET = async ( request: Request,{ params }: { params: { id: string } }) => {
  try {
    const {id} = params;
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) {
      return NextResponse.json({ message: "Post not found!" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: "Failed to fetch post" }, { status: 500 });
  }
};




export const PATCH= async ( request: Request,{ params }: { params: { id: string } }) => {
  try {
    const body = await request.json();
    const { name, short_name } = body;
    const { id } = params;
    const updatePost = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        name,
        short_name,
      },
    });

    if (!updatePost) {
      return NextResponse.json({ message: "Post not found!" }, { status: 404 });
    }
    return NextResponse.json(updatePost);
  } catch (error) {
    console.error('PATCH Error:', error);
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }
};



export const DELETE = async ( request: Request,{ params }: { params: { id: string } }) => {
    try {
      const { id } = params;
      await prisma.post.delete({
        where: {
          id: id,
        },
      });
  
      return NextResponse.json("Post has been deleted");
    } catch (error) {
      console.error('DELETE Error:', error);
      return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
    }
  };
  
