import { fetchCompanyById } from "@/actions";
import EditForm from "@/components/edit-form";
import { Companies } from "../../../../../models/Company";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  //   console.log(id);
  const { name, address, phone } = await fetchCompanyById(id);
  //   console.log(name, address, phone)
  const formData: {
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
  } = { id, name, address, phone };

  // als ik niet de formData stingify en weer parse krijg ik een error dat mijn address object niet plain is, maar toJSON method heeft
  //   const formData2=JSON.parse(JSON.stringify(formData))
  //   console.log(formData,formData2)

  return <EditForm initialData={formData}></EditForm>;
}
