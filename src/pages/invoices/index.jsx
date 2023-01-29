import { Box, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Headers";
import { useContext, useEffect } from "react";
import { App } from "../../contex";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const Invoices = () => {
  const app = useContext(App);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    app.setTitle("Invoices Balances");
  });

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: "90%",
        top: "57px",
        position: "relative",
        overflow: "auto",
      }}
      p="20px"
    >
      <Header title="INVOICES" subtitle="List Invoices Belances" />
      <Box
        m="20px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[600],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.grey[600],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          autoHeight
          checkboxSelection
          pageSize={5}
          rowsPerPageOptions={[5]}
          pagination
          components={{ Toolbar: GridToolbar, Pagination: CustomPagination }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          rows={mockDataInvoices}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
