"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "@mui/material";
import { Person } from "../../models/Person";
import { deleteOnePerson } from "@/personActions";

interface PersonsTableProps {
  rows: Person[],
  query: string,
}

const handleDeleteClick = (id: GridRowId) => () => {
  deleteOnePerson(id);
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    sortable: false,
    width: 250,
    renderCell: (params) => (
      <div>
        {params.row.address.street} {params.row.address.number}{params.row.address.addendum ? "-" : " "}{params.row.address.addendum}<br />
        {params.row.address.postcode} {params.row.address.city} {params.row.address.country}
      </div>
    ),
  },
  {
    field: "company",
    headerName: "Company name",
    sortable: false,
    width: 250,
    renderCell: (params) => (
      <div>
        {params.row.company.name} <br />
        {params.row.company._id}
      </div>
    ),
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          LinkComponent={Link}
          // Ignore this because LinkComponent is used the href is a valid prop
          // @ts-ignore
          href={`/persons/${id}/edit`}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];

export default function PersonsTable({ rows, query }: PersonsTableProps) {
  // console.log("Dit is de query in de table: ", query)
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        marginTop: "20px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
