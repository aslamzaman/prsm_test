import { NextResponse } from 'next/server';
import { Connect } from '@/db/MongoDbConnection';
import { GenderModel } from '@/models/GenderModel';


export async function GET() {
  try {
    await Connect();
    const genders = await GenderModel.find({}).sort({_id:'desc'});
    return NextResponse.json({ genders });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch genders' }, { status: 500 });
  }
}



export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name } = body;
    await Connect();
    const genders = await GenderModel.create({ name });
    return NextResponse.json(genders);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}