
import { createPerson, listCompanyNames } from "@/personActions";
import CreatePersonForm from "@/components/CreatePersonForm";
import { Box, TextField } from "@mui/material";



export default function Page() {
  const dataset2 = listCompanyNames();
  return (
    <CreatePersonForm companyListData={dataset2} />
  )
}
