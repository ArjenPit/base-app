import * as React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { Companies } from "../../../models/Company";
import { fetchCompanies } from "@/actions";
import CompaniesTable from "@/components/CompaniesTable";
import SearchBar from "@/components/SearchBar";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  console.log("query: ", query);

  const rows: Companies[] = await fetchCompanies();

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Company Page
        </Typography>
        <FormControl
          fullWidth
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <SearchBar label="Search companies" placeholder="Search companies ofzo"></SearchBar>
          <Button
            href="/companies/create"
            style={{ width: "300px" }}
            variant="contained"
          >
            <Add style={{ marginRight: "10px" }} />
            Add new company
          </Button>
        </FormControl>
        <CompaniesTable rows={rows} query={query} />
      </Box>
    </Container>
  );
}
