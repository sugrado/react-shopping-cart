import { Button } from "@mui/material";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import React from "react";

export default function ProductList(props: any) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 60, disableColumnMenu: true },
    {
      field: "categoryId",
      headerName: "Category Id",
      width: 60,
      disableColumnMenu: true,
    },
    {
      field: "productName",
      headerName: "Name",
      width: 260,
      disableColumnMenu: true,
    },
    {
      field: "quantityPerUnit",
      headerName: "Quantity Per Unit",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "unitsInStock",
      headerName: "Units In Stock",
      width: 150,
      disableColumnMenu: true,
    },
    {
      field: "button",
      headerName: "Action",
      width: 150,
      renderCell: (event) => {
        return (
          <Button
            variant="contained"
            color="success"
            onClick={() => props.addToCart(event.row)}
          >
            Add To Cart
          </Button>
        );
      },
    },
  ];

  const dataGridOptions: DataGridProps = {
    columns: columns,
    rows: props.products,
    pageSize: 14,
    disableSelectionOnClick: true,
    rowsPerPageOptions: [14],
  };

  return (
    <div style={{ height: window.outerHeight - 200, width: "100%" }}>
      <h3>
        {props.info.title}-{props.info.currentCategory.categoryName}
      </h3>
      <DataGrid {...dataGridOptions} />
    </div>
  );
}
