import { NextResponse } from 'next/server';
import { Connect } from '@/db/MongoDbConnection';
import { CustomerModel } from '@/models/CustomerModel';


export async function GET() {
  try {
    await Connect();
    const customers = await CustomerModel.find({}).sort({_id:'desc'});
    return NextResponse.json({ customers });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch customers' }, { status: 500 });
  }
}



export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, address, contact, join_date, show_in_dues, createdAt, updatedAt } = body;
    await Connect();
    const customers = await CustomerModel.create({ name, address, contact, join_date, show_in_dues, createdAt, updatedAt });
    return NextResponse.json(customers);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}