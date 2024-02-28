import { NextResponse } from 'next/server';
import { Connect } from '@/lib/connection';
import { PostTable } from '@/lib/model';



export const PUT = async (req: Request,{ params }:{params: {id: string}}) => {
  try {
    const body = await req.json();
    const {id} = params;
    const { name, short_name } = body;
    await Connect();
    const posts = await PostTable.findByIdAndUpdate(id, {name, short_name});
    return NextResponse.json(posts);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}



export const DELETE = async (req: Request,{ params }:{params: {id: string}}) => {
    try {
      const {id} = params;
      await Connect();
      const posts = await PostTable.findOneAndDelete({_id: id});
      return NextResponse.json(posts);
    } catch (err) {
      return NextResponse.json({ message: "POST Error", err }, { status: 500 });
    }
  }
  

