"use client";
import * as React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { createPerson } from "@/personActions";
import { Person } from "../../../../models/Person";
import { fetchCompanies } from "@/actions";
import { Companies } from "../../../../models/Company";

export default function Page() {
  const [personData, setPersonData] = React.useState<Person>();

  const [companyList, setCompanyList] = React.useState<Companies[]>();
  
  React.useEffect(() => {
    fetchCompanies().then(data => setCompanyList(data));
    // setCompanyList(data);
  }, [])
  
  console.log(companyList)

  const options: {label: string, id: number}[] = [
    { label: "fivano", id: 1 },
    { label: "universiteit", id: 2 },
    { label: "school", id: 3 },
    { label: "jemoeder", id: 4 },
    { label: "jevader", id: 5 },
    { label: "jezus", id: 6 },
  ];

  const [value, setValue] = React.useState<{id: number, label: string} | null>(options[0]);
//   const [inputValue, setInputValue] = React.useState('');


  const handleSubmit = () => {
    console.log(personData);
    // createPerson(person)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPersonData((prevFormData) => {
      return {
        ...prevFormData,
        address: {
          ...prevFormData?.address,
          [event.target.name]: event.target.value,
        },
      };
    });
  }

  console.log(value);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Create New Person
        </Typography>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box sx={{ display: "flex", gap: "5px", width: "100%" }}>
            <TextField
              id="firstName"
              label="First Name"
              name="firstName"
              value={personData?.firstName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              id="lastName"
              label="Last Name"
              name="lastName"
              value={personData?.lastName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", gap: "5px", width: "100%" }}>
            <TextField
              id="street"
              label="Street"
              name="street"
              value={personData?.address?.street}
              onChange={handleAddressChange}
              required
              fullWidth
            />
            <TextField
              id="number"
              label="Number"
              name="number"
              value={personData?.address?.number}
              onChange={handleAddressChange}
              InputLabelProps={{ shrink: true }}
              sx={{ width: "120px" }}
              required
            />
            <TextField
              id="addendum"
              label="Add"
              name="addendum"
              value={personData?.address?.addendum}
              onChange={handleAddressChange}
              InputLabelProps={{ shrink: true }}
              sx={{ width: "80px" }}
            />
          </Box>
          <Box sx={{ display: "inline-flex", gap: "5px", width: "100%" }}>
            <TextField
              id="postcode"
              label="Postcode"
              name="postcode"
              value={personData?.address?.postcode}
              onChange={handleAddressChange}
              sx={{ width: "160px" }}
              required
              fullWidth
            />
            <TextField
              id="city"
              label="City"
              name="city"
              value={personData?.address?.city}
              onChange={handleAddressChange}
              fullWidth
            />
          </Box>

          <TextField
            id="country"
            label="Country"
            name="country"
            value={personData?.address?.country}
            onChange={handleAddressChange}
            fullWidth
          />
          <Autocomplete
            id="combo-box-demo"
            value={value}
            onChange={(event: any, newValue: {id: number, label: string} | null) => {
              setValue(newValue);
            }}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            isOptionEqualToValue={(option:{id: number, label: string}, value:{ id: number, label: string}) => option.id === value.id}
            options={options}
            renderInput={(params) => <TextField {...params} label="Search Company" />}
            fullWidth
          />
          {/* <TextField
                select
                id="company"
                label="Company"
                name="company"
                value={personData?.company}
                onChange={handleChange}
                required fullWidth
            /> */}
          <Box display="flex" gap="10px">
            <Button variant="contained" color="error" href="/persons">
              X
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create new company
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
}
