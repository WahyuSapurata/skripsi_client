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
import { useContext, useEffect, useState } from "react";
import { App } from "../../../contex";
import { useFormik } from "formik";
import PreviewImage from "../../../middleware/PreviewImage";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axiosJWT from "../../../middleware/Jwt";
import { useNavigate } from "react-router-dom";

const AddJurnal = () => {
  const app = useContext(App);
  const navigate = useNavigate();

  useEffect(() => {
    app.setTitle(false);
  }, []);

  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const addJurnal = async () => {
    const formData = new FormData();
    formData.append("tanggal", formik.values.tanggal);
    formData.append("deskrisi", formik.values.deskrisi);
    formData.append("file", formik.values.image);
    formData.append("debet", formik.values.debet);
    formData.append("kredit", formik.values.kredit);

    try {
      const response = await axiosJWT.post(
        "http://localhost:3100/addJurnal",
        formData
      );
      app.setLoaderProgress({ show: true });
      app.setSnackbar({ open: true, message: response.data.message });
      navigate("/jurnal");
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      tanggal: "",
      deskrisi: "",
      image: "",
      debet: "",
      kredit: "",
    },
    validationSchema: yup.object({
      tanggal: yup.date().required("tanggal transaksi harus di isi"),
      deskrisi: yup.string().required("deskrisi harus di isi"),
      image: yup
        .mixed()
        .required("gambar harus di isi")
        .test(
          "FILE_SIZE",
          "ukuran tidak boleh dari 5MB",
          (value) => value && value.size < 5000000
        )
        .test(
          "FILE_TYPE",
          "tipe file tidak cocok",
          (value) => value && ["image/png", "image/jpeg"].includes(value.type)
        ),
      debet: yup.string().nullable(),
      kredit: yup.string().nullable(),
    }),
    onSubmit: addJurnal,
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
          <Header title="CREATE JURNAL" subtitle="Create a New Jurnal" />

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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    size="small"
                    label="Tanggal Transaksi"
                    value={formik.values.tanggal}
                    onChange={(tanggal) =>
                      formik.setFieldValue("tanggal", tanggal)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="tanggal"
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ gridColumn: "span 4" }}
                        onBlur={formik.handleBlur}
                        error={
                          !!formik.touched.tanggal && !!formik.errors.tanggal
                        }
                        helperText={
                          formik.touched.tanggal && formik.errors.tanggal
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
                <TextField
                  fullWidth
                  id="outlined-size-small"
                  size="small"
                  type="text"
                  label="Deskripsi"
                  name="deskrisi"
                  value={formik.values.deskrisi}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={!!formik.touched.deskrisi && !!formik.errors.deskrisi}
                  helperText={formik.touched.deskrisi && formik.errors.deskrisi}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box>
                  <Button
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    component="label"
                    endIcon={<PhotoCamera />}
                    color={
                      formik.touched.undefined && formik.errors.image
                        ? "error"
                        : undefined
                    }
                  >
                    Upload bukti
                    <input
                      onChange={(e) =>
                        formik.setFieldValue("image", e.currentTarget.files[0])
                      }
                      onBlur={formik.handleBlur}
                      name="image"
                      hidden
                      accept="image/*"
                      multiple
                      type="file"
                    />
                  </Button>
                  {formik.touched.undefined && (
                    <FormHelperText sx={{ ml: "14px" }} error>
                      {formik.errors.image}
                    </FormHelperText>
                  )}
                  {formik.values.image && (
                    <PreviewImage file={formik.values.image} />
                  )}
                </Box>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{ gridColumn: "span 4" }}
                >
                  <InputLabel id="demo-select-small">Pilih Jurnal</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selectedValue}
                    onChange={handleSelectChange}
                    label="Pilih Jurnal"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="debet">debet</MenuItem>
                    <MenuItem value="kredit">kredit</MenuItem>
                  </Select>
                </FormControl>
                {selectedValue && (
                  <TextField
                    style={{ textTransform: "capitalize" }}
                    name={selectedValue}
                    label={"Masukkan Jumlah " + selectedValue}
                    value={formik.values.selectedValue}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={
                      !!formik.touched.selectedValue &&
                      !!formik.errors.selectedValue
                    }
                    helperText={
                      formik.touched.selectedValue &&
                      formik.errors.selectedValue
                    }
                    sx={{ gridColumn: "span 4" }}
                    size="small"
                  />
                )}
                {/* <TextField
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
                                </FormControl> */}
              </Box>
              <Box display="flex" justifyContent="start" mt="20px">
                <Button type="submit" color="info" variant="outlined">
                  Kirim
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

export default AddJurnal;
