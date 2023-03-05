import {
  Box,
  Paper,
  Button,
  TextField,
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link,
  Snackbar,
  Slide,
  Stepper,
  Step,
  StepLabel,
  styled,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormik } from "formik";
import * as yup from "yup";
import { Fragment, forwardRef, useContext, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// icon
import MuiAlert from "@mui/material/Alert";

import Check from '@mui/icons-material/Check';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PropTypes from 'prop-types';

import { App } from "../../contex";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <AccountBalanceIcon />,
    2: <PersonIcon />,
    3: <VpnKeyIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const Register = () => {
  const app = useContext(App);
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
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


  //  stepper
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // end stepper

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const Register = async () => {
    try {
      const response = await axios.post('http://localhost:3100/add_user', {
        name_bisnis: formik.values.name_bisnis,
        alamat_bisnis: formik.values.alamat_bisnis,
        nama_pengguna: formik.values.nama_pengguna,
        email_pengguna: formik.values.email_pengguna,
        nomor_pengguna: formik.values.nomor_pengguna,
        password: formik.values.password,
        confPassword: formik.values.confPassword,
      });
      app.setSnackbar({ open: true, message: response.data.message });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  const phoneRegExp =
    /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/;

  const formik = useFormik({
    initialValues: {
      name_bisnis: "",
      alamat_bisnis: "",
      nama_pengguna: "",
      email_pengguna: "",
      nomor_pengguna: "",
      password: "",
      confPassword: ""
    },
    validationSchema: yup.object({
      name_bisnis: yup.string().required("nama bisnis harus di isi"),
      alamat_bisnis: yup.string().nullable(),
      nama_pengguna: yup.string().required("nama pengguna harus di isi"),
      email_pengguna: yup
        .string()
        .email("email pengguna harus sesuai")
        .required("email pengguna harus di isi"),
      nomor_pengguna: yup
        .string()
        .matches(phoneRegExp, "nomor tidak valid")
        .required("nomor harus di isi"),
      password: yup.string()
        .min(8, "minimal 8 karakter")
        .required("password harus di isi"),
      confPassword: yup.string()
        .oneOf([yup.ref("password")], "confirm password tidak sesuai")
        .required("confirm password harus di isi")
    }),
    onSubmit: Register,
  });

  const steps = [
    {
      label: 'Bisnis',
      description:
        <Box display={"grid"} gap={"10px"}>
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
        </Box>
    },
    {
      label: 'Pengguna',
      description:
        <Box display={"grid"} gap={"10px"}>
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
        </Box>
    },
    {
      label: 'Akun',
      description:
        <Box display={"grid"} gap={"10px"}>
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
          <FormControl size="small" sx={{}} variant="outlined">
            {(() => {
              if (formik.touched.confPassword && formik.errors.confPassword) {
                return (
                  <InputLabel
                    color="error"
                    htmlFor="outlined-adornment-confPassword"
                  >
                    Confirm Password
                  </InputLabel>
                );
              } else {
                return (
                  <InputLabel htmlFor="outlined-adornment-confPassword">
                    Confirm Password
                  </InputLabel>
                );
              }
            })()}
            <OutlinedInput
              id="outlined-adornment-confPassword"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confPassword visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              name="confPassword"
              value={formik.values.confPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={
                !!formik.touched.confPassword && !!formik.errors.confPassword
              }
            />
            {formik.touched.confPassword && formik.errors.confPassword && (
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
                {formik.errors.confPassword}
              </Typography>
            )}
          </FormControl>
        </Box>
    },
  ];
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
                p: "15px",
                width: "60%",
              }}
            >
              <Typography mb={"30px"} textAlign={"center"} variant="h2" fontWeight="bold" sx={{}}>
                Register
                <Divider />
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Box display="grid" rowGap="20px">
                  <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>{label.label}</StepLabel>
                        </Step>
                      )
                    })}
                  </Stepper>

                  {activeStep === steps.length ? (
                    <Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        Apakah data yang ada isi sudah benar!
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                        {/* <Box sx={{ flex: '1 1 auto' }} /> */}
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Button onClick={handleReset}>Reset</Button>
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
                          Register
                        </Button>
                      </Box>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].description}</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                          <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                            Skip
                          </Button>
                        )}

                        <Button onClick={handleNext}>
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </Box>
                    </Fragment>
                  )}
                </Box>
                <Divider sx={{ mt: "15px", color: "GrayText" }}>atau</Divider>
              </form>
              <Typography variant="caption">
                Sudah punya akun
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mt="8px"
              >
                <Link
                  href="/"
                  underline="hover"
                  color={"blue"}
                >
                  Sign in
                </Link>
              </Box>
            </Paper>
          </Box>
        </Grid>
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
              src="../../assets/login/login1.png"
              alt=""
              style={{ width: "80%" }}
            />
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={app.snackbar.open}
        onClose={(state) => {
          app.setSnackbar({ open: false, message: "" });
        }}
        autoHideDuration={1000}
        key={"snackbar"}
      >
        <Alert
          onClose={(state) => {
            app.setSnackbar({ open: false, message: "" });
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          {app.snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
