"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Image from "next/image";

const userData = [
  {
    id: 1,
    name: "Arrora gaur",
    email: "arroragaur@gmail.com",
    status: false,
    date: new Date(),
  },
  {
    id: 2,
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    status: true,
    date: new Date(),
  },
  {
    id: 3,
    name: "Robert Bacins",
    email: "robertbacins@gmail.com",
    status: false,
    date: new Date(),
  },
  {
    id: 4,
    name: "Bethany Jackson",
    email: "bethanyjackson@gmail.com",
    status: false,
    date: new Date(),
  },
  {
    id: 5,
    name: "Arrora gaur",
    email: "arroragaur@gmail.com",
    status: false,
    date: new Date(),
  },
  {
    id: 6,
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    status: true,
    date: new Date(),
  },
  {
    id: 7,
    name: "Robert Bacins",
    email: "robertbacins@gmail.com",
    status: false,
    date: new Date(),
  },
  {
    id: 8,
    name: "Bethany Jackson",
    email: "bethanyjackson@gmail.com",
    status: false,
    date: new Date(),
  },
];

export default function UserManagement() {
  const [rows, setRows] = React.useState(userData);

  const handleDeleteRow = React.useCallback((id: any) => {
    // Implement delete row logic here
    console.log("Delete row:", id);
  }, []);

  const handleEditRow = React.useCallback((id: any) => {
    // Implement edit row logic here
    console.log("Edit row:", id);
  }, []);

  const handleToggleStatus = (id: any) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          status: !row.status,
        };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (params) => {
        return (
          <>
            {params.value && (
              <Image src={"/Message.svg"} alt="Email Icon" className="mr-2" />
            )}
            {params.value}
          </>
        );
      },
      width: 250,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <>
            {params.value && (
              <Image src={"/Calendar.svg"} alt="Date Icon" className="mr-2" />
            )}
            {params.value instanceof Date
              ? params.value.toLocaleDateString()
              : params.value}
          </>
        );
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <button
          className={` my-10 rounded-full w-[120px]   text-bold text-center py-2  ${params.row.status ? "bg-red-100 text-[#D11A2A]  " : "bg-[#F1FAF4] text-[#3A974C]"}`}
          onClick={() => handleToggleStatus(params.row.id)}
        >
          {params.row.status ? "Active" : "Inactive"}
        </button>
      ),
    },

    {
      field: "delete",
      headerName: "Action",
      width: 80,
      sortable: false,
      filterable: false,

      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <Image
              src={"/Delete.svg"}
              alt="Delete Icon"
              style={{ cursor: "pointer", marginRight: 5 }}
              onClick={() => handleDeleteRow(params.row.id)}
            />
            <Image
              src={"/Edit.svg"}
              alt="Edit Icon"
              style={{ cursor: "pointer" }}
              onClick={() => handleEditRow(params.row.id)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
