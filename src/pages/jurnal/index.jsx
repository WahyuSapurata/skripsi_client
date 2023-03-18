import {
  Alert,
  Avatar,
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

import moment from "moment";

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

const Jurnal = () => {
  const app = useContext(App);
  const navigate = useNavigate();
  const [jurnal, setJurnal] = useState([]);
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
    getJurnal();
    app.setTitle("Jurnal Umum");
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

  const getJurnal = async () => {
    const response = await axiosJWT.get("http://localhost:3100/getJurnal");
    console.log(response);
    app.setLoaderProgress({ show: false });
    setJurnal(response.data);
  };

  const deleteJurnal = async (id) => {
    try {
      const response = await axiosJWT.delete(
        `http://localhost:3100/deleteJurnal/${id}`
      );
      app.setLoaderProgress({ show: true });
      app.setSnackbar({ open: true, message: response.data.message });
    } catch (error) {
      console.log(error);
    }
    handleClose();
    getJurnal();
  };

  const columns = useMemo(
    () => [
      { field: "_id", hide: true },
      {
        field: "tanggal",
        headerName: "Tanggal",
        flex: 1,
        cellClassName: "name-column--cell",
        editable: true,
        renderCell: (params) =>
          moment(params.row.tanggal).format("DD-MMM-YYYY"),
      },
      {
        field: "deskrisi",
        headerName: "Deskripsi",
        flex: 1,
        editable: true,
      },
      {
        field: "url",
        headerName: "Ref",
        width: 80,
        renderCell: (params) => (
          <Tooltip title={params.row.image}>
            <img
              src={params.row.url}
              loading="lazy"
              width="100%"
              alt={params.row.image}
            />
          </Tooltip>
        ),
      },
      {
        field: "debet",
        headerName: "Debet",
        flex: 1,
        editable: true,
      },
      {
        field: "kredit",
        headerName: "Kredit",
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
                to={`/editJurnal/${params.id}`}
                color="warning"
              >
                <BootstrapTooltip title="Edit">
                  <BorderColorIcon />
                </BootstrapTooltip>
              </IconButton>
              <IconButton
                // onClick={() => deleteJurnal(params.id)}
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
          <Header title="Jurnal Umum" subtitle="Daftar Jurnal Umum" />
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
              to="/addJurnal"
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
                    fields: ["tanggal", "deskrisi", "url", "debet", "kredit"],
                  },
                },
              }}
              rows={jurnal}
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
                  onClick={() => deleteJurnal(ID)}
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

export default Jurnal;
