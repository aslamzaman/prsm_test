import { NextResponse } from 'next/server';
import { Connect } from '@/db/MongoDbConnection';
import { GenderModel } from '@/models/GenderModel';


export const PUT = async (req: Request,{ params }:{params: {id: string}}) => {
  try {
    const body = await req.json();
    const {id} = params;
    const { name } = body;
    await Connect();
    const genders = await GenderModel.findByIdAndUpdate(id, { name });
    return NextResponse.json(genders);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async (req: Request,{ params }:{params: {id: string}}) => {
  try {
    const {id} = params;
    await Connect();
    const genders = await GenderModel.findOneAndDelete({_id: id});
    return NextResponse.json(genders);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 