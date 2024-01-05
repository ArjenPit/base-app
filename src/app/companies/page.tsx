import * as React from "react";
import { Box, Button, Container, FormControl, InputAdornment, TextField, Typography } from "@mui/material";
import { Add, Search } from '@mui/icons-material';
// import CompaniesServer from "@/components/CompaniesServer";
import { Companies } from "../../../models/Company";
// import dbConnect from "@/dbConnect";
import { fetchCompanies } from "@/actions";
import CompaniesTable from "@/components/CompaniesTable";


export default async function Page() {
  const rows: Companies[] = await fetchCompanies();
  
  return (
    <Container>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <Typography variant="body1" gutterBottom>
          Company Page
        </Typography>
        <FormControl fullWidth sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          justifyContent: 'space-between',
        }}>
          <TextField
            fullWidth
            label="Search companies..."
            type="search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <Button
            href="/companies/create"
            style={{ width: '300px' }}
            variant="contained"
          >
            <Add style={{ marginRight: '10px' }}/>
            Add new company
          </Button>
        </FormControl>
        <CompaniesTable
          rows={rows}
        />   
      </Box>
    </Container>
  );
}
