import { NextResponse } from 'next/server';
import { Connect } from '@/db/MongoDbConnection';
import { EmployeeModel } from '@/models/EmployeeModel';


export async function GET() {
  try {
    await Connect();
    const employees = await EmployeeModel.find({}).sort({_id:'desc'});
    return NextResponse.json({ employees });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch employees' }, { status: 500 });
  }
}



export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { name, address, gender_id, district_id, post_id, join_dt, mobile } = body;
    await Connect();
    const employees = await EmployeeModel.create({ name, address, gender_id, district_id, post_id, join_dt, mobile });
    return NextResponse.json(employees);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}