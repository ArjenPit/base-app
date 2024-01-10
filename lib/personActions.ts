'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";
import Person, { Persons } from "../models/Person";
import Company from "../models/Company";

export async function createPerson(
    person: Persons
  ) {
    await dbConnect();
    const { firstName, lastName, address, company } = person;
    await Person.create({ firstName, lastName, address, company });
    revalidatePath("/companies");
    redirect("/companies");
}

// export async function searchCompanyNames() {
//     try {
//         await dbConnect();
//         const list = await Company.find({})
//         console.log(list)
//         return list;
//     } catch(error) {
//         throw error;
//     }
// }
