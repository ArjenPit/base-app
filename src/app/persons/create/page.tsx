
import { listCompanyNames } from "@/personActions";
import CreatePersonForm from "@/components/CreatePersonForm";



export default async function Page() {

  const dataset = await listCompanyNames();

  return (
    <CreatePersonForm companyList={dataset} />
  )
}
