import { NextResponse } from 'next/server';
import { connect } from '@/lib/connection';


export async function GET() {
  try {
   // await mongoose.connect('mongodb+srv://aslam:aslam2014@cluster0.aoj7q.mongodb.net/wgi?retryWrites=true&w=majority');
   
   const { Post } = await connect();

    const posts = await Post.find({});
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  }

}

/*

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
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}


*/

