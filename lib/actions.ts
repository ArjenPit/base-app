"use server";
import { GridRowId } from "@mui/x-data-grid";
import Company, { Companies } from "../models/Company";
import dbConnect from "./dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Task from "../models/Task";

export async function fetchCompanies(): Promise<Companies[]> {
  try {
    await dbConnect();
    const companiesList = await Company.find({}).lean();
    const updatedCompaniesList = await Promise.all(
      companiesList.map(async (company) => {
        company.id = String(company._id);
        delete company._id;
        return company;
      })
    );
    return updatedCompaniesList as Companies[];
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error; // Propagate the error
  }
}

export async function createCompany(
  name: string,
  address: {
    street: string;
    postcode: string;
    city: string;
    province: string;
    country: string;
  },
  phone: string
) {
  await dbConnect();
  // const { name, address, phone } = formData;
  await Company.create({ name, address, phone });
  revalidatePath("/companies");
  redirect("/companies");
}

export async function updateCompany(data: {
  id: string;
  name: string;
  address: {
    street: string;
    postcode: string;
    city: string;
    province: string;
    country: string;
  };
  phone: string;
}) {
  try {
    await dbConnect();
    const filter = { _id: data.id };
    const update = {
      name: data.name,
      address: data.address,
      phone: data.phone,
    };
    // const update = data;
    await Company.findOneAndUpdate(filter, update);
  } catch (error) {
    throw error;
  }
  revalidatePath("/companies");
  redirect("/companies?updateSuccess");
}

export async function fetchCompanyById(id: string) {
  try {
    await dbConnect();
    return await Company.findById<Companies>(id).lean() as Companies;
  } catch (error) {
    throw error;
  }
}

export async function deleteOneCompany(id: GridRowId) {
  try {
    await dbConnect();
    await Company.deleteOne({ _id: id });
    revalidatePath("/companies");
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error; // Propagate the error
  }
}

export async function deleteOneTask(id: string) {
  try {
    await dbConnect();
    await Task.deleteOne({ _id: id });
    revalidatePath("/tasks");
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error; // Propagate the error
  }
}
