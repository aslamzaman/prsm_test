import { NextResponse } from 'next/server';
import { Connect } from '@/lib/connection';
import { PostTable } from '@/lib/model';


export async function GET() {
  try {
    await Connect();
    const posts = await PostTable.find({});
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
    await Connect();
    const posts = await PostTable.create({name, short_name});
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}



