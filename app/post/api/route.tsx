import { NextResponse } from 'next/server';
import { Connect } from '@/db/MongoDbConnection';
import { PostTable } from '@/models/PostModel';


export async function GET() {
  try {
    await Connect();
    const posts = await PostTable.find({}).sort({_id:'desc'});
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



