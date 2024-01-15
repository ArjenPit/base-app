
import { fetchPersonById, listCompanyNames } from "@/personActions";
import EditPersonForm from "@/components/EditPersonForm";
import { Person } from "../../../../../models/Person";

export type PersonPopulatedCompany = {
  id: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    number: string;
    addendum: string;
    postcode: string;
    city: string;
    country: string;
  };
  company: { name: string, id: string };
}

export default async function Page({ params }: { params: { id: string } }) {
  const _id = params.id;

  const companyList = await listCompanyNames();
  const { firstName, lastName, address, company } = await fetchPersonById(_id);
  const formData: Person = { _id, firstName, lastName, address, company };
  const index = companyList.map((p) => p.id).indexOf(String(formData.company));

  // console.log(formData)

  return <EditPersonForm initialData={formData} companyList={companyList} index={index}></EditPersonForm>;
}
