import {
  Box,
  Paper,
  Button,
  TextField,
  Grid,
  Typography,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link,
  // Alert,
  Snackbar,
  Grow,
  Slide,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormik } from "formik";
import * as yup from "yup";
import { forwardRef, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useSession } from "../../middleware/UseSession";
import { useNavigate } from "react-router-dom";

// icon
import MailLockIcon from "@mui/icons-material/MailLock";
import LockIcon from "@mui/icons-material/Lock";

import MuiAlert from "@mui/material/Alert";
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Login = () => {
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const [, setSession] = useSession();
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState, Transition) => () => {
    setState({ open: true, ...newState, Transition });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const Auth = async () => {
    try {
      const response = await axios.post("http://localhost:3100/login", {
        email_pengguna: formik.values.email_pengguna,
        password: formik.values.password,
      });
      setSession(response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      email_pengguna: "",
      password: "",
    },
    validationSchema: yup.object({
      email_pengguna: yup
        .string()
        .email("email pengguna harus sesuai")
        .required("email pengguna harus di isi"),
      password: yup.string().required("password harus di isi"),
    }),
    onSubmit: Auth,
  });
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Grid
        height="-webkit-fill-available"
        width="100%"
        sx={{
          display: isNonMobile ? "grid" : undefined,
          margin: isNonMobile ? 0 : undefined,
        }}
        container
        spacing={2}
      >
        <Grid sx={{ display: isNonMobile ? "none" : "block" }} xs={7}>
          <Box
            alignItems="center"
            justifyItems="center"
            display="grid"
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src="../../assets/login/login2.png"
              alt=""
              style={{ width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid xs={isNonMobile ? 12 : 5}>
          <Box
            alignItems="center"
            justifyItems="center"
            display="grid"
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: "10px",
                width: "50%",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Typography variant="h2" fontWeight="bold" sx={{}}>
                Login
                <Divider />
              </Typography>
              <Avatar
                alt="avatar login"
                src="../../assets/login/avatar login.png"
                sx={{ width: "100px", height: "100px" }}
              />
              <form onSubmit={formik.handleSubmit}>
                <Box display="grid" rowGap="20px">
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <MailLockIcon sx={{ color: "action.active", m: "8px" }} />
                    <TextField
                      fullWidth
                      id="outlined-size-small"
                      size="small"
                      type="text"
                      label="Email pengguna"
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
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <LockIcon sx={{ color: "action.active", m: "8px" }} />
                    <FormControl size="small" sx={{}} variant="outlined">
                      {(() => {
                        if (formik.touched.password && formik.errors.password) {
                          return (
                            <InputLabel
                              color="error"
                              htmlFor="outlined-adornment-password"
                            >
                              Password
                            </InputLabel>
                          );
                        } else {
                          return (
                            <InputLabel htmlFor="outlined-adornment-password">
                              Password
                            </InputLabel>
                          );
                        }
                      })()}
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={
                          !!formik.touched.password && !!formik.errors.password
                        }
                      />
                      {formik.touched.password && formik.errors.password && (
                        <Typography
                          variant="caption"
                          color="#d32f2f"
                          sx={{
                            fontWeight: 400,
                            fontSize: "0.6428571428571428rem",
                            lineHeight: 1.66,
                            textAlign: "left",
                            mt: "4px",
                            mr: "14px",
                            mb: 0,
                            ml: "14px",
                          }}
                        >
                          {formik.errors.password}
                        </Typography>
                      )}
                    </FormControl>
                  </Box>
                  <Box display="grid">
                    <Button
                      onClick={handleClick(
                        {
                          vertical: "bottom",
                          horizontal: "center",
                        },
                        SlideTransition
                      )}
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Login
                    </Button>
                  </Box>
                </Box>
                <Divider sx={{ mt: "15px", color: "GrayText" }}>atau</Divider>
              </form>
              <Typography variant="caption">
                Daftar jika belum punya akun
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mt="8px"
              >
                <Link
                  href=""
                  underline="none"
                  sx={{
                    p: "3px 10px",
                    borderRadius: "5px",
                    backgroundColor: "yellow",
                    ":hover": {
                      backgroundColor: "yellowgreen",
                    },
                  }}
                >
                  Daftar
                </Link>
                <Link
                  href="#"
                  sx={{ color: "rgb(25, 118, 210)" }}
                  underline="always"
                >
                  Lupa Password
                </Link>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {errors && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          autoHideDuration={3000}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errors.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Login;
