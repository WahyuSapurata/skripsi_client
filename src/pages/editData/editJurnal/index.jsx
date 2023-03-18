import { Box, Button, TextField, Paper } from "@mui/material";
import * as yup from "yup";
import Header from "../../../components/Headers";
import Foother from "../../../components/Foothers";
import Sidebar from "../../global/Sidebar";
import Topbar from "../../global/Topbar";
import { useContext, useEffect } from "react";
import { App } from "../../../contex";
import { useFormik } from "formik";
import PreviewImage from "../../../middleware/PreviewImage";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axiosJWT from "../../../middleware/Jwt";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";

const EditJurnal = () => {
  const app = useContext(App);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    app.setTitle(false);
    getJurnalById();
  }, []);

  const editJurnal = async () => {
    const formData = new FormData();
    formData.append("tanggal", formik.values.tanggal);
    formData.append("deskrisi", formik.values.deskrisi);
    formData.append("file", formik.values.image);
    formData.append("debet", formik.values.debet);
    formData.append("kredit", formik.values.kredit);

    try {
      const response = await axiosJWT.put(
        `http://localhost:3100/updateJurnal/${id}`,
        formData
      );
      app.setLoaderProgress({ show: true });
      app.setSnackbar({ open: true, message: response.data.message });
      navigate("/jurnal");
    } catch (error) {
      console.log(error);
    }
  };

  const getJurnalById = async () => {
    const response = await axiosJWT.get(
      `http://localhost:3100/getJurnalById/${id}`
    );
    console.log(response);
    formik.setValues({
      tanggal: response.data.tanggal,
      deskrisi: response.data.deskrisi,
      url: response.data.url,
      debet: response.data.debet,
      kredit: response.data.kredit,
    });
  };

  const formik = useFormik({
    initialValues: {
      tanggal: "",
      deskrisi: "",
      debet: "",
      kredit: "",
    },
    validationSchema: yup.object({
      tanggal: yup.date().required("tanggal transaksi harus di isi"),
      deskrisi: yup.string().required("deskrisi harus di isi"),
      debet: yup.string().nullable(),
      kredit: yup.string().nullable(),
    }),
    onSubmit: editJurnal,
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
          <Header title="EDIT JURNAL" subtitle="Edit Jurnal yang sudah ada" />

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
                    component="label"
                    endIcon={<PhotoCamera />}
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
                  <Box>
                    {formik.values.image ? (
                      <PreviewImage file={formik.values.image} />
                    ) : (
                      <img
                        style={{
                          width: "200px",
                          marginTop: "10px",
                          borderRadius: "8px",
                          border: `2px solid ${colors.primary[1000]}`,
                        }}
                        loading="lazy"
                        src={formik.values.url}
                        alt=""
                      />
                    )}
                  </Box>
                </Box>
                {(() => {
                  if (formik.values.debet !== "") {
                    return (
                      <TextField
                        fullWidth
                        id="outlined-size-small"
                        size="small"
                        type="text"
                        label="Debet"
                        name="debet"
                        value={formik.values.debet}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={!!formik.touched.debet && !!formik.errors.debet}
                        helperText={formik.touched.debet && formik.errors.debet}
                        sx={{ gridColumn: "span 4" }}
                      />
                    );
                  } else if (formik.values.kredit !== "") {
                    return (
                      <TextField
                        fullWidth
                        id="outlined-size-small"
                        size="small"
                        type="text"
                        label="Kredit"
                        name="kredit"
                        value={formik.values.kredit}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                          !!formik.touched.kredit && !!formik.errors.kredit
                        }
                        helperText={
                          formik.touched.kredit && formik.errors.kredit
                        }
                        sx={{ gridColumn: "span 4" }}
                      />
                    );
                  }
                })()}
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

export default EditJurnal;
