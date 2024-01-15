"use client"
import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { createPerson } from "@/personActions";
import { Person } from "../../models/Person";

type ListItem = { label: string, id: string };

// let loading = true;

export default function CreatePersonForm( {companyList}: {companyList: ListItem[]} ) {
    // console.log("tralala: ", companyListData)
    const [personData, setPersonData] = useState<Person>(
      {
        _id: null,
        firstName: '',
        lastName: '',
        address: {
          street: '',
          number: '',
          addendum: '',
          city: '',
          postcode: '',
          country: '',
        },
        company: '',
      });
// console.log(companyList[0].label)
      // const [companyList, setCompanyList] = useState<ListItem[]>(companyListData);
      const [value, setValue] = useState<ListItem | null>(null);
      // const [inputValue, setInputValue] = useState<string>(companyList[0].label);
      
      const handleSubmit = () => {
        console.log(personData);
        createPerson(personData);
      };

      const handleCompanyChange = (id: string | null | undefined) => {
        console.log("I am handling company ID; value: ", id)
        setPersonData((prevFormData) => {
          return {
            ...prevFormData,
            company: id,
          };
        });
      }
    
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
                  type="number"
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
                id="company"
                value={value}
                onChange={(_event, newValue: ListItem | null) => {
                  handleCompanyChange(newValue?.id)
                  setValue(newValue)
                }}
                // inputValue={inputValue}
                // onInputChange={(_event, newInputValue: string) => {
                //   setInputValue(newInputValue);
                // }}
                options={companyList}
                fullWidth
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.label}
                    </li>
                  )
                }}
                renderTags={(tagValue, getTagProps) => {
                  return tagValue.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option.id} label={option.label} />
                  ))
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select a Company"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
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