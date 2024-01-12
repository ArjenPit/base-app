'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";
import PersonMongo, { Person } from "../models/Person";
import Company from "../models/Company";

export async function createPerson(
    person: Person
  ) {
    await dbConnect();
    const { firstName, lastName, address, company } = person;
    await PersonMongo.create({ firstName, lastName, address, company });
    revalidatePath("/companies");
    redirect("/companies");
}

export async function listCompanyNames() {
    try {
        await dbConnect();
        const list = (await Company.find({}).select('_id name').lean().then())
          .map((lala) => {
            lala.label = lala.name;
            lala.id = lala._id.toString();
            delete lala._id;
            delete lala.name;
            return lala;
          });
        console.log(list)
        return list;
    } catch(error) {
        throw error;
    }
}
