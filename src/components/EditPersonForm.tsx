"use client";

import { updatePerson } from "@/personActions";
import {
  Container,
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  Autocomplete,
  Chip,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import { Person } from "../../models/Person";

type ListItem = {label: string, id: string};

export default function EditPersonForm({
  initialData, companyList, index,
}: {
  initialData: Person,
  companyList: ListItem[],
  index: number,
}) {
  const [formData, setFormData] = useState(initialData);
  const [value, setValue] = useState<ListItem | null>(companyList[index]);

  const handleSubmit = () => {
    updatePerson(formData);
  };

  const handleCompanyChange = (id: string | null | undefined) => {
    console.log("I am handling company ID; value: ", id)
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        company: id,
      };
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        address: {
          ...prevFormData.address,
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
          Edit {formData.firstName} {formData.lastName}
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
              id="name"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              id="name"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
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
              value={formData.address.street}
              onChange={handleAddressChange}
              required
              fullWidth
            />
            <TextField
              id="number"
              label="Number"
              name="number"
              value={formData.address.number}
              onChange={handleAddressChange}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ width: "120px" }}
            />
            <TextField
              id="addendum"
              label="Add"
              name="addendum"
              value={formData.address.addendum}
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
              value={formData.address.postcode}
              onChange={handleAddressChange}
              required
              fullWidth
            />
            <TextField
              id="city"
              label="City"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              fullWidth
            />
          </Box>
          <TextField
            id="country"
            label="Country"
            name="country"
            value={formData.address.country}
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
              />
            )}
          />
          <Box display="flex" gap="10px">
            <Button variant="contained" color="error" href="/companies">
              X
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update company
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Container>
  );
}
