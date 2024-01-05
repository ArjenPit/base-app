"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { Companies } from "../../models/Company";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { deleteOneCompany } from "@/actions";
import { Link } from "@mui/material";
// import Link from "next/link";


interface CompaniesTableProps {
  rows: Companies[];
}

const handleDeleteClick = (id: GridRowId) => () => {
  deleteOneCompany(id);
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "Company name",
    width: 150,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    sortable: false,
    width: 250,
    // editable: false,
    renderCell: (params) => (
      <div>
        {params.row.address.street} <br />
        {params.row.address.postcode} {params.row.address.city}
      </div>
    ),
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 110,
    editable: true,
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
          href={`/companies/${id}/edit`}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  },
];

export default function CompaniesTable({ rows }: CompaniesTableProps) {
  // const rows = props.rows;
  // console.log("rows: ", rows)
  // function getRowId(rows: { id: string; }) {
  //   return rows.id;
  // }
  // getRowId={getRowId}

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
