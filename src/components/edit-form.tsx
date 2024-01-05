'use client'

import { updateCompany } from "@/actions";
import { Container, Box, Typography, FormControl, TextField, Button, Snackbar, Alert } from "@mui/material";
import React from "react";

export default function EditCompanyForm( {initialData}: { initialData: {
    id: String,
    name: String,
    address: {
        street: String,
        postcode: String,
        city: String,
        province: String,
        country: String,
    },
    phone: String,
}}
) {
    const [formData, setFormData] = React.useState({
        id: initialData.id,
        name: initialData.name,
        address: {
            street: initialData.address?.street,
            postcode: initialData.address?.postcode,
            city: initialData.address?.city,
            province: initialData.address?.province,
            country: initialData.address?.country,
        },
        phone: initialData.phone,
    })
   
    const handleSubmit = () => {
        updateCompany(formData)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                address: {
                    ...prevFormData.address,
                    [event.target.name]: event.target.value
                }
            }
        })
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
                Edit {formData.name}
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
                        value={formData.name}
                        onChange={handleChange}
                        required fullWidth
                    />
                    <TextField
                        id="street"
                        label="Street and number"
                        name="street"
                        value={formData.address.street}
                        onChange={handleAddressChange}
                        required fullWidth
                    />
                    <TextField
                        id="postcode"
                        label="Postcode"
                        name="postcode"
                        value={formData.address.postcode}
                        onChange={handleAddressChange}
                        required fullWidth
                    />
                    <TextField
                        id="city"
                        label="City"
                        name="city"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        fullWidth
                    />
                    <TextField
                        id="province"
                        label="Province"
                        name="province"
                        value={formData.address.province}
                        onChange={handleAddressChange}
                        fullWidth
                    />
                    <TextField
                        id="country"
                        label="Country"
                        name="country"
                        value={formData.address.country}
                        onChange={handleAddressChange}
                        fullWidth
                    />
                    <TextField
                        id="phone"
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required fullWidth
                    />
                    <Box display="flex" gap="10px">
                    <Button variant="contained" color="error" href="/companies">X</Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Update company</Button>
                    </Box>
                </FormControl>
            </Box>
        </Container>
    )
}