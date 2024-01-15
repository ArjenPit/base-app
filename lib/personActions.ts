'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import dbConnect from "./dbConnect";
import PersonMongo, { Person } from "../models/Person";
import Company from "../models/Company";
import { GridRowId } from "@mui/x-data-grid";


type ListItem = { label: string; id: string; };

export async function createPerson(
    person: Person
  ) {
    await dbConnect();
    const { firstName, lastName, address, company } = person;
    await PersonMongo.create({ firstName, lastName, address, company });
    revalidatePath("/persons");
    redirect("/persons");
}

export async function listCompanyNames(): Promise<ListItem[]> {
    try {
        await dbConnect();
        const list = await Company.find({}).select('_id name').lean()
          .then(async (data) => {
            return await Promise.all(
              data.map(async (listItem) => {
                return {
                  label: String(listItem.name),
                  id: String(listItem._id),
                };
              })
            );
            // return editList;
          })
          .catch(error => {
            throw error;
          });
        // const listEdit: ListItem[] = await Promise.all(
        //   list.map(async (item) => {
        //     return {
        //       label: item.name,
        //       id: String(item._id),
        //     };
        //   })
        // );
        return list;
    } catch(error) {
        throw error;
    }
}

export async function fetchPersons(): Promise<Person[]> {
  try {
    await dbConnect();
    const personList = await PersonMongo.find({}).populate({
      path: 'company',
      select: 'name',
    }).lean();
    const updatedPersonList = await Promise.all(
      personList.map(async (person) => {
        person.id= String(person._id);
        person.company._id = String(person.company._id);
        delete person._id;
        return person
      })
    );
    return updatedPersonList as Person[];
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error; // Propagate the error
  }
}

export async function updatePerson(data: Person) {
  try {
    await dbConnect();
    const filter = { _id: data._id };
    const update = {
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      company: data.company,
    };
    // const update = data;
    await PersonMongo.findOneAndUpdate(filter, update);
  } catch (error) {
    throw error;
  }
  revalidatePath("/persons");
  redirect("/persons?updateSuccess");
}

export async function deleteOnePerson(id: GridRowId) {
  try {
    await dbConnect();
    await PersonMongo.deleteOne({ _id: id });
    revalidatePath("/persons");
  } catch (error) {
    console.error("Error deleting person:", error);
    throw error; // Propagate the error
  }
}

export async function fetchPersonById(id: string): Promise<Person> {
  try {
    await dbConnect();
    const personQuery = await PersonMongo
      .findById<Person>(id)
      .lean()
      .then((data) => {
        const personData = ({
          firstName: data?.firstName,
          lastName: data?.lastName,
          address: data?.address,
          _id: String(data?._id),
          company: String(data?.company),
        })
        // delete personData._id;
        // console.log("deze data: ", personData)
        return personData
      }) .catch(error => {
        throw error;
      });
      // console.log("PersonQuery: ", personQuery)
    return personQuery;
  } catch (error) {
    throw error;
  }
}