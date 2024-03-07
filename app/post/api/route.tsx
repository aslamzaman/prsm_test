import { NextResponse } from 'next/server';
import { Connect } from '@/db/MongoDbConnection';
import { PostModel } from '@/models/PostModel';


export const GET = async () => {
  try {
    await Connect();
    const posts = await PostModel.find({}).sort({ _id: 'desc' });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
  }
}


export const POST = async (req: Request) => {
  try {
    await Connect();
    const { name, shortname } = await req.json();
    const posts = await PostModel.create({ name, shortname });
    return NextResponse.json(posts);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}











