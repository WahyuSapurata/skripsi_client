import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  IconButton,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
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
import Header from "../../components/Headers";
import { useContext, useMemo, useState } from "react";
import { App } from "../../contex";
import { useEffect } from "react";
import Foother from "../../components/Foothers";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { styled } from "@mui/material/styles";

import refreshToken from "../../middleware/RefreshToken";
import { Link, useNavigate } from "react-router-dom";
import axiosJWT from "../../middleware/Jwt";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

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
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const UserManagement = () => {
  const app = useContext(App);
  const navigate = useNavigate();
  const [userManagement, setUserManagement] = useState([]);
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState();

  const handleClickOpen = (id) => {
    setOpen(true);
    setID(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserManagement();
    app.setTitle("User Management");
    refreshToken().catch(() => {
      navigate("/");
    });
  }, []);

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  const getUserManagement = async () => {
    const response = await axiosJWT.get(
      "http://localhost:3100/userManagements"
    );
    // app.setBackdrop({ open: false });
    setUserManagement(response.data.result);
  };

  const deleteUserManagement = async (id) => {
    try {
      const response = await axiosJWT.delete(
        `http://localhost:3100/hapusUserManagement/${id}`
      );
      app.setBackdrop({ open: true });
      app.setSnackbar({ open: true, message: response.data.message });
    } catch (error) {
      console.log(error);
    }
    handleClose();
    getUserManagement();
  };

  const columns = useMemo(
    () => [
      { field: "_id", hide: true },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        editable: true,
      },
      {
        field: "nomor",
        headerName: "Nomor Hanphone",
        flex: 1,
        editable: true,
      },
      {
        field: "role",
        headerName: "Role",
        flex: 1,
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        align: "center",
        renderCell: (params) => {
          return (
            <Box display="flex" justifyContent="center">
              <IconButton
                component={Link}
                to={`/editUserManagement/${params.id}`}
                color="warning"
              >
                <BootstrapTooltip title="Edit">
                  <BorderColorIcon />
                </BootstrapTooltip>
              </IconButton>
              <IconButton
                // onClick={() => deleteUserManagement(params.id)}
                onClick={() => handleClickOpen(params.id)}
                color="error"
              >
                <BootstrapTooltip title="Hapus">
                  <DeleteIcon />
                </BootstrapTooltip>
              </IconButton>
            </Box>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box
          sx={{
            height: "83vh",
            top: "57px",
            position: "relative",
            overflow: "auto",
          }}
          p="20px"
        >
          <Header
            title="Manajement Pengguna"
            subtitle="Daftar Manajemen Pengguna"
          />
          <Box
            m="20px 0 0 0"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                fontSize: "0.92rem",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#FFB100",
                borderBottom: "none",
              },
              "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
              },
            }}
          >
            <Button
              component={Link}
              to="/addUserManagement"
              color="success"
              variant="outlined"
              startIcon={<AddToPhotosIcon />}
            >
              Tambah
            </Button>
            <DataGrid
              autoHeight
              pageSize={5}
              rowsPerPageOptions={[5]}
              pagination
              components={{
                Toolbar: GridToolbar,
                Pagination: CustomPagination,
              }}
              componentsProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                  printOptions: {
                    hideFooter: true,
                    hideToolbar: true,
                    fields: ["name", "email", "nomor", "role"],
                  },
                },
              }}
              rows={userManagement}
              columns={columns}
              getRowId={(row) => row._id}
            />
            <Dialog open={open} onClose={handleClose}>
              <Alert severity="warning" variant="filled">
                Apakah anda serius ingin menghapus data.?
              </Alert>
              <DialogActions sx={{ placeContent: "center" }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteUserManagement(ID)}
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={handleClose}
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
        <Foother />
      </main>
    </>
  );
};

export default UserManagement;
