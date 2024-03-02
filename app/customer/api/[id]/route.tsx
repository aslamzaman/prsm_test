import { NextResponse } from 'next/server';
import { Connect } from '@/db/MongoDbConnection';
import { CustomerModel } from '@/models/CustomerModel';


export const PUT = async (req: Request,{ params }:{params: {id: string}}) => {
  try {
    const body = await req.json();
    const {id} = params;
    const { name, address, contact, join_date, show_in_dues, createdAt, updatedAt } = body;
    await Connect();
    const customers = await CustomerModel.findByIdAndUpdate(id, { name, address, contact, join_date, show_in_dues, createdAt, updatedAt });
    return NextResponse.json(customers);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async (req: Request,{ params }:{params: {id: string}}) => {
  try {
    const {id} = params;
    await Connect();
    const customers = await CustomerModel.findOneAndDelete({_id: id});
    return NextResponse.json(customers);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 