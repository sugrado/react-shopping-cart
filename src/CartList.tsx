import { Button, Stack } from "@mui/material";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import React from "react";

export default function CartList(props: any) {
  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Your cart is empty
      </Stack>
    );
  }
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      width: 60,
      disableColumnMenu: true,
      hide: true,
    },
    {
      field: "product.categoryId",
      headerName: "Category Id",
      width: 60,
      disableColumnMenu: true,
      valueGetter: (params) => {
        return params.row.product.categoryId;
      },
    },
    {
      field: "product.productName",
      headerName: "Name",
      width: 260,
      disableColumnMenu: true,
      valueGetter: (params) => {
        return params.row.product.productName;
      },
    },
    {
      field: "product.quantityPerUnit",
      headerName: "Quantity Per Unit",
      width: 200,
      disableColumnMenu: true,
      valueGetter: (params) => {
        return params.row.product.productName;
      },
    },
    {
      field: "product.unitPrice",
      headerName: "Unit Price",
      width: 100,
      disableColumnMenu: true,
      valueGetter: (params) => {
        return params.row.product.unitPrice;
      },
    },
    {
      field: "product.unitsInStock",
      headerName: "Units In Stock",
      width: 130,
      disableColumnMenu: true,
      valueGetter: (params) => {
        return params.row.product.unitsInStock;
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
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
            color="error"
            onClick={() => props.removeFromCart(event.row.product)}
          >
            Remove
          </Button>
        );
      },
    },
  ];

  const dataGridOptions: DataGridProps = {
    columns: columns,
    rows: props.cart,
    pageSize: 14,
    disableSelectionOnClick: true,
    rowsPerPageOptions: [14],
    components: { NoRowsOverlay },
  };
  return (
    <div style={{ height: window.outerHeight - 200, width: "100%" }}>
      <h3>Cart List</h3>
      <DataGrid {...dataGridOptions} />
    </div>
  );
}
