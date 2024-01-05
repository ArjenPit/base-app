'use server'
import dbConnect from "@/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Company from "../../../../models/Company";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// export async function GET(req: NextRequest) {
//   await dbConnect();
//   console.log(Company);
//   const companiesList = await Company.find({});
//   return NextResponse.json(companiesList);
// }

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { name, address, phone } = body;
  const createCompany = await Company.create({ name, address, phone });
  revalidatePath('/companies');
  redirect('/companies');
  return NextResponse.json(createCompany);
}
