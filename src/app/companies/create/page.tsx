"use client";
import * as React from "react";
import { Box, Button, Container, FormControl, Link, TextField, Typography } from "@mui/material";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCompany } from "@/actions";

export default function Page() {
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState({
    street: "",
    postcode: "",
    city: "",
    province: "",
    country: "",
  });
  const [phone, setPhone] = React.useState("");

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setName(event.target.value);
//   };

  // const handleSubmit = () => {
  //   fetch("/api/companies", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, address, phone }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  const handleSubmit = () => {
    console.log(name, address, phone)
    createCompany(name, address, phone)
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
          Company Page
        </Typography>
        <FormControl
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px"
            }}
        >
            <TextField
                id="name"
                label="Company Name"
                name="name"
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setName(event.target.value);
                }}
                required fullWidth
            />
            <TextField
                id="street"
                label="Street and number"
                name="street"
                value={address.street}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(old => (
                        {
                            ...old,
                            street: event.target.value,
                        }
                    ));
                }}
                required fullWidth
            />
            <TextField
                id="postcode"
                label="Postcode"
                name="postcode"
                value={address.postcode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(old => (
                        {
                            ...old,
                            postcode: event.target.value,
                        }
                    ));
                }}
                required fullWidth
            />
            <TextField
                id="city"
                label="City"
                name="city"
                value={address.city}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(old => (
                        {
                            ...old,
                            city: event.target.value,
                        }
                    ));
                }}
                fullWidth
            />
            <TextField
                id="province"
                label="Province"
                name="province"
                value={address.province}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(old => (
                        {
                            ...old,
                            province: event.target.value,
                        }
                    ));
                }}
                fullWidth
            />
            <TextField
                id="country"
                label="Country"
                name="country"
                value={address.country}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(old => (
                        {
                            ...old,
                            country: event.target.value,
                        }
                    ));
                }}
                fullWidth
            />
            <TextField
                id="phone"
                label="Phone"
                name="phone"
                value={phone}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPhone(event.target.value);
                }}
                required fullWidth
            />
            <Box display="flex" gap="10px">
              <Button variant="contained" color="error" href="/companies">X</Button>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Create new company</Button>
            </Box>
        </FormControl>
      </Box>
    </Container>
  );
}
