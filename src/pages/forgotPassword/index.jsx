import {
    Box,
    Paper,
    Button,
    TextField,
    Typography,
    Avatar,
    Divider,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Link,
    Snackbar,
    Slide,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { forwardRef, useContext, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// icon
import MailLockIcon from "@mui/icons-material/MailLock";
import LockIcon from "@mui/icons-material/Lock";
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';

import { App } from "../../contex";

import MuiAlert from "@mui/material/Alert";
function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const ForgotPassword = () => {
    const app = useContext(App);
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

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const ForgotPassword = async () => {
        try {
            const response = await axios.post('http://localhost:3100/forgotPassword', {
                email_pengguna: formik.values.email_pengguna,
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

    const formik = useFormik({
        initialValues: {
            email_pengguna: "",
            password: "",
            confPassword: ""
        },
        validationSchema: yup.object({
            email_pengguna: yup
                .string()
                .email("email pengguna harus sesuai")
                .required("email pengguna harus di isi"),
            password: yup.string().min(8, "minimal 8 karakter").required("password harus di isi"),
            confPassword: yup.string()
                .oneOf([yup.ref("password")], "confirm password tidak sesuai")
                .required("confirm password harus di isi")
        }),
        onSubmit: ForgotPassword
    });
    return (
        <Box
            sx={{
                flexGrow: 1,
            }}
        >

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
                        width: "30%",
                        display: "grid",
                        placeItems: "center",
                        gap: "10px"
                    }}
                >
                    <Typography variant="h2" fontWeight="bold" sx={{}}>
                        Forgot Password
                        <Divider />
                    </Typography>
                    <Avatar
                        alt="avatar login"
                        src="../../assets/login/reset-password.png"
                        sx={{ width: "100px", height: "100px" }}
                    />
                    <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
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
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <LockIcon sx={{ color: "action.active", m: "8px" }} />
                                    <FormControl size="small" sx={{ width: "100%" }} variant="outlined">
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
                            </Box>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                    <WifiProtectedSetupIcon sx={{ color: "action.active", m: "8px" }} />
                                    <FormControl size="small" sx={{ width: "100%" }} variant="outlined">
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

export default ForgotPassword;
