import { NextResponse } from 'next/server';
import { Connect } from '@/db/MongoDbConnection';
import { EmployeeModel } from '@/models/EmployeeModel';


export const PUT = async (req: Request,{ params }:{params: {id: string}}) => {
  try {
    const body = await req.json();
    const {id} = params;
    const { name, address, gender_id, district_id, post_id, join_dt, mobile } = body;
    await Connect();
    const employees = await EmployeeModel.findByIdAndUpdate(id, { name, address, gender_id, district_id, post_id, join_dt, mobile });
    return NextResponse.json(employees);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async (req: Request,{ params }:{params: {id: string}}) => {
  try {
    const {id} = params;
    await Connect();
    const employees = await EmployeeModel.findOneAndDelete({_id: id});
    return NextResponse.json(employees);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 