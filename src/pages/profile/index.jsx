import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Headers";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Foother from "../../components/Foothers";
import { tokens } from "../../theme";

import { useFormik } from "formik";
import * as yup from "yup";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import StoreIcon from "@mui/icons-material/Store";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import refreshToken from "../../middleware/RefreshToken";
import { useNavigate } from "react-router-dom";

import axiosJWT from "../../middleware/Jwt";

import { App } from "../../contex";

const Profile = () => {
  const app = useContext(App);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [preview, setPreview] = useState({});

  useEffect(() => {
    app.setTitle(false);
    getUserById();
    refreshToken().catch(() => {
      navigate("/");
    });
  }, []);

  const updateUser = async () => {
    const formData = new FormData();
    formData.append("nama_pengguna", formik.values.nama_pengguna);
    formData.append("name_bisnis", formik.values.name_bisnis);
    formData.append("email_pengguna", formik.values.email_pengguna);
    formData.append("alamat_bisnis", formik.values.alamat_bisnis);
    formData.append("nomor_pengguna", formik.values.nomor_pengguna);
    formData.append("file", formik.values.image);
    try {
      const response = await axiosJWT.put(
        `http://localhost:3100/users/${sessionStorage.getItem("userId")}`,
        formData
      );
      app.setLoaderProgress({ show: true });
      app.setProfile(response.data.user);
      setTimeout(() => {
        app.setLoaderProgress({ show: false });
        navigate("/profile");
        app.setSnackbar({ open: true, message: response.data.message });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const phoneRegExp =
    /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/;

  const formik = useFormik({
    initialValues: {
      nama_pengguna: "",
      name_bisnis: "",
      email_pengguna: "",
      alamat_bisnis: "",
      nomor_pengguna: "",
    },
    validationSchema: yup.object({
      nama_pengguna: yup.string().required("nama pengguna harus di isi"),
      name_bisnis: yup.string().required("nama bisnis harus di isi"),
      email_pengguna: yup
        .string()
        .required("email harus di isi")
        .email("email tidak sesuai format"),
      alamat_bisnis: yup.string().required("alamat bisnis harus di isi"),
      nomor_pengguna: yup
        .string()
        .matches(phoneRegExp, "phone number is not valid")
        .required("alamat bisnis harus di isi"),
    }),
    onSubmit: updateUser,
  });

  const getUserById = async () => {
    const response = await axiosJWT.get(
      `http://localhost:3100/users/${sessionStorage.getItem("userId")}`
    );
    formik.setValues({
      nama_pengguna: response.data.nama_pengguna,
      email_pengguna: response.data.email_pengguna,
      name_bisnis: response.data.name_bisnis,
      alamat_bisnis: response.data.alamat_bisnis,
      nomor_pengguna: response.data.nomor_pengguna,
      url: response.data.url,
    });
  };

  const file = formik.values.image;
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

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
          <Header title="User Profile" subtitle="Edit user profile" />
          <Box padding="0 30px">
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <Paper
                  sx={{ p: "15px", display: "grid", justifyItems: "center" }}
                >
                  <Avatar
                    src={formik.values.image ? preview : app.profile.url}
                    alt=""
                    sx={{
                      width: "100px",
                      height: "100px",
                      border: `3px solid ${colors.primary[1000]}`,
                    }}
                  />
                  <Typography variant="h2" mt="5px">
                    {app.profile.nama_pengguna}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ opacity: "0.6", fontWeight: "normal" }}
                  >
                    Administrator
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ opacity: "0.6", fontWeight: "normal" }}
                  >
                    {app.profile.email_pengguna}
                  </Typography>
                  <hr style={{ width: "100%" }} />
                  <Box
                    sx={{
                      "& .css-1a9gfzx-MuiTableCell-root, .css-puocp3-MuiTableCell-root":
                        {
                          padding: "7px 10px",
                          borderBottom: "none",
                        },
                      "& .css-11xur9t-MuiPaper-root-MuiTableContainer-root": {
                        boxShadow:
                          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 1%), 0px 1px 3px 0px rgb(0 0 0 / 7%)",
                      },
                      ".cellIcon": {
                        display: "flex",
                        placeItems: "center",
                      },
                      "& .css-1wc2z39-MuiTableRow-root": {
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      },
                    }}
                  >
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableBody>
                          <TableRow>
                            <TableCell className="cellIcon">
                              <StoreIcon /> Nama Bisnis
                            </TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{app.profile.name_bisnis}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="cellIcon">
                              <AlternateEmailIcon /> Alamat Bisnis
                            </TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{app.profile.alamat_bisnis}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="cellIcon">
                              <PhoneAndroidIcon /> Nomor Pengguna
                            </TableCell>
                            <TableCell>:</TableCell>
                            <TableCell>{app.profile.nomor_pengguna}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={7}>
                <Paper sx={{ p: "15px" }}>
                  <Box>
                    <form
                      onSubmit={formik.handleSubmit}
                      encType="multipart/form-data"
                      autoComplete="off"
                    >
                      <Box display="grid" rowGap="20px">
                        <TextField
                          fullWidth
                          id="outlined-size-small"
                          size="small"
                          type="text"
                          label="Nama Pengguna"
                          name="nama_pengguna"
                          value={formik.values.nama_pengguna}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            !!formik.touched.nama_pengguna &&
                            !!formik.errors.nama_pengguna
                          }
                          helperText={
                            formik.touched.nama_pengguna &&
                            formik.errors.nama_pengguna
                          }
                        />
                        <TextField
                          fullWidth
                          id="outlined-size-small"
                          size="small"
                          type="text"
                          label="Nama Bisnis"
                          name="name_bisnis"
                          value={formik.values.name_bisnis}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            !!formik.touched.name_bisnis &&
                            !!formik.errors.name_bisnis
                          }
                          helperText={
                            formik.touched.name_bisnis &&
                            formik.errors.name_bisnis
                          }
                        />
                        <TextField
                          fullWidth
                          id="outlined-size-small"
                          size="small"
                          type="text"
                          label="Email Pengguna"
                          name="email_pengguna"
                          value={formik.values.email_pengguna}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            !!formik.touched.email_pengguna &&
                            !!formik.errors.email_pengguna
                          }
                          helperText={
                            formik.touched.email_pengguna &&
                            formik.errors.email_pengguna
                          }
                        />
                        <TextField
                          fullWidth
                          id="outlined-size-small"
                          size="small"
                          type="text"
                          label="Alamat Bisnis"
                          name="alamat_bisnis"
                          value={formik.values.alamat_bisnis}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            !!formik.touched.alamat_bisnis &&
                            !!formik.errors.alamat_bisnis
                          }
                          helperText={
                            formik.touched.alamat_bisnis &&
                            formik.errors.alamat_bisnis
                          }
                        />
                        <TextField
                          fullWidth
                          id="outlined-size-small"
                          size="small"
                          type="text"
                          label="Nomor Pengguna"
                          name="nomor_pengguna"
                          value={formik.values.nomor_pengguna}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={
                            !!formik.touched.nomor_pengguna &&
                            !!formik.errors.nomor_pengguna
                          }
                          helperText={
                            formik.touched.nomor_pengguna &&
                            formik.errors.nomor_pengguna
                          }
                        />
                        <Button variant="outlined" component="label">
                          Edit gambar
                          <input
                            hidden
                            accept="image/*"
                            multiple
                            type="file"
                            onChange={(e) =>
                              formik.setFieldValue("image", e.target.files[0])
                            }
                            name="image"
                            onBlur={formik.handleBlur}
                          />
                        </Button>
                        <Box display="grid">
                          <Button
                            // onClick={handleClick(
                            //   {
                            //     vertical: "bottom",
                            //     horizontal: "center",
                            //   },
                            //   SlideTransition
                            // )}
                            disabled={formik.isSubmitting}
                            // onClick={refreshPage}
                            type="submit"
                            variant="contained"
                            color="success"
                          >
                            Perbarui
                          </Button>
                        </Box>
                      </Box>
                    </form>
                    {/* <PreviewImage file={formik.values.image} /> */}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Foother />
      </main>
    </>
  );
};

export default Profile;
