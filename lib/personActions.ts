'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";
import PersonMongo, { Person } from "../models/Person";
import Company from "../models/Company";

type ListItem = { label: string, id: string };

export async function createPerson(
    person: Person
  ) {
    await dbConnect();
    const { firstName, lastName, address, company } = person;
    await PersonMongo.create({ firstName, lastName, address, company });
    revalidatePath("/companies");
    redirect("/companies");
}

export async function listCompanyNames(): Promise<ListItem[]> {
    try {
        await dbConnect();
        const list = await Company.find({}).select('_id name').lean();
        const listEdit = await Promise.all(
          list.map(async (lala) => {
            lala.label = lala.name;
            lala.id = String(lala._id);
            delete lala._id;
            delete lala.name;
            return lala;
          })
        );
        return listEdit;
    } catch(error) {
        throw error;
    }
}
