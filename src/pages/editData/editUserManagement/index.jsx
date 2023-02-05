import {
  Box,
  Button,
  TextField,
  Paper,
  //   useMediaQuery,
  FormHelperText,
} from "@mui/material";
import * as yup from "yup";
import Header from "../../../components/Headers";
import Foother from "../../../components/Foothers";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import { useContext, useEffect } from "react";
import { App } from "../../../contex";
import { useFormik } from "formik";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axiosJWT from "../../../middleware/Jwt";
import { useNavigate, useParams } from "react-router-dom";

const EditUserManagement = () => {
  const app = useContext(App);
  const navigate = useNavigate();
  const { id } = useParams();

  const phoneRegExp =
    /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/;

  useEffect(() => {
    app.setTitle(false);
    getUserManagementById();
  }, []);

  const update = async () => {
    try {
      const response = await axiosJWT.put(
        `http://localhost:3100/editUserManagement/${id}`,
        {
          name: formik.values.name,
          email: formik.values.email,
          nomor: formik.values.nomor,
          role: formik.values.role,
        }
      );
      app.setSnackbar({ open: true, message: response.data.message });
      app.setBackdrop({ open: true });
      navigate("/userManagement");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserManagementById = async () => {
    const response = await axiosJWT.get(
      `http://localhost:3100/getUserManagement/${id}`
    );
    console.log(response);
    formik.setValues({
      name: response.data.name,
      email: response.data.email,
      nomor: response.data.nomor,
      role: response.data.role,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      nomor: "",
      role: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("name harus di isi"),
      email: yup
        .string()
        .email("email tidak sesuai")
        .required("email harus di isi"),
      nomor: yup
        .string()
        .matches(phoneRegExp, "nomor handphone tidak sesuai")
        .required("nomor handphone harus di isi"),
      role: yup.string().required("role harus di pilih"),
    }),
    onSubmit: update,
  });

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
          <Header title="CREATE USER" subtitle="Create a New User Profile" />

          <Paper elevation={3} sx={{ p: "10px" }}>
            <form onSubmit={formik.handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                // sx={{
                //   "& > div": {
                //     gridColumn: isNonMobile ? undefined : "span 4",
                //   },
                // }}
              >
                <TextField
                  fullWidth
                  id="outlined-size-small"
                  size="small"
                  type="text"
                  label="Nama"
                  name="name"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  id="outlined-size-small"
                  size="small"
                  type="email"
                  label="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  name="email"
                  error={!!formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  id="outlined-size-small"
                  size="small"
                  type="text"
                  label="Nomor Handphone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.nomor}
                  name="nomor"
                  error={!!formik.touched.nomor && !!formik.errors.nomor}
                  helperText={formik.touched.nomor && formik.errors.nomor}
                  sx={{ gridColumn: "span 4" }}
                />
                <FormControl
                  fullWidth
                  size="small"
                  sx={{ gridColumn: "span 4" }}
                  error={!!formik.touched.role && !!formik.errors.role}
                >
                  <InputLabel id="demo-select-small">Role</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={formik.values.role}
                    label="Role"
                    name="role"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Keuangan">Keuangan</MenuItem>
                    <MenuItem value="Bagian Gudang">Bagian Gudang</MenuItem>
                  </Select>
                  <FormHelperText>
                    {formik.touched.role && formik.errors.role}
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="start" mt="20px">
                <Button type="submit" color="info" variant="outlined">
                  Update
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
        <Foother />
      </main>
    </>
  );
};

export default EditUserManagement;
