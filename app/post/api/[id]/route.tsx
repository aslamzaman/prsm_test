import { NextResponse } from 'next/server';
import { Connect } from '@/db/MongoDbConnection';
import { PostModel } from '@/models/PostModel';



export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await Connect();
    const { id } = params;
    const posts = await PostModel.findById(id);
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}





export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await Connect();
    const { name, shortname } = await req.json();
    const { id } = params;
    const posts = await PostModel.findOneAndUpdate({ _id: id }, { name, shortname });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await Connect();
    const { id } = params;
    const posts = await PostModel.findOneAndDelete({ _id: id });
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 