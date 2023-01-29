import { Box, Button, TextField, Paper } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Headers";
import { useContext, useEffect } from "react";
import { App } from "../../contex";

const Form = () => {
  const app = useContext(App);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const phoneRegExp =
    /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/;

  useEffect(() => {
    app.setTitle("Profil Form");
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      address1: "",
      address2: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      email: yup.string().email("invalid email").required("required"),
      contact: yup
        .string()
        .matches(phoneRegExp, "phone number is not valid")
        .required("required"),
      address1: yup.string().required("required"),
      address2: yup.string().required("required"),
    }),
  });

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
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Paper elevation={3} sx={{ p: "10px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "sapan 4" },
            }}
          >
            <TextField
              color="secondary"
              fullWidth
              id="outlined-size-small"
              size="small"
              type="text"
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={!!formik.touched.firstName && !!formik.errors.firstName}
              helperText={formik.touched.firstName && formik.errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              color="secondary"
              fullWidth
              id="outlined-size-small"
              size="small"
              type="text"
              label="Last Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              name="lastName"
              error={!!formik.touched.lastName && !!formik.errors.lastName}
              helperText={formik.touched.lastName && formik.errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              color="secondary"
              fullWidth
              id="outlined-size-small"
              size="small"
              type="email"
              label="Email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              error={!!formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              color="secondary"
              fullWidth
              id="outlined-size-small"
              size="small"
              type="text"
              label="Contact"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.contact}
              name="contact"
              error={!!formik.touched.contact && !!formik.errors.contact}
              helperText={formik.touched.contact && formik.errors.contact}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              color="secondary"
              fullWidth
              id="outlined-size-small"
              size="small"
              type="text"
              label="Address 1"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address1}
              name="address1"
              error={!!formik.touched.address1 && !!formik.errors.address1}
              helperText={formik.touched.address1 && formik.errors.address1}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              color="secondary"
              fullWidth
              id="outlined-size-small"
              size="small"
              type="text"
              label="Address 2"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address2}
              name="address2"
              error={!!formik.touched.address2 && !!formik.errors.address2}
              helperText={formik.touched.address2 && formik.errors.address2}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create User
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Form;
