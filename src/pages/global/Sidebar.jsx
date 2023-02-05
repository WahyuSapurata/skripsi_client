import { forwardRef, useContext, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenIconIcon from "@mui/icons-material/MenuOpen";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupIcon from "@mui/icons-material/Group";
import { App } from "../../contex";
import { useEffect } from "react";
import refreshToken from "../../middleware/RefreshToken";
import axiosJWT from "../../middleware/Jwt";

import MuiAlert from "@mui/material/Alert";
import Loading from "../../components/Loading";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const app = useContext(App);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(app.title);
  const isNonMobile = useMediaQuery("(max-width:600px)");
  const [width, setWidth] = useState();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [Position, setPosition] = useState("");
  const navigate = useNavigate();

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function getSize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    app.setBackdrop({ open: true });
    refreshToken().catch(() => {
      navigate("/");
    });
    getUserById();
    setSelected(app.title);
    window.addEventListener("resize", getSize);
    if (width < 600) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
    return () => {
      window.removeEventListener("resize", getSize);
    };
  }, [app.title, window.innerWidth]);

  const getUserById = async () => {
    const response = await axiosJWT.get(
      `http://localhost:3100/users/${sessionStorage.getItem("userId")}`
    );
    app.setBackdrop({ open: false });
    app.setProfile(response.data);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar": {
          color: colors.greenAccent[1000],
        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary[1000]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "10px 25px 10px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#FBC252 !important",
        },
        "& .pro-menu-item.active": {
          color: "#FFB100 !important",
        },
        "& .pro-sidebar .pro-menu": {
          paddingTop: 0,
        },
      }}
    >
      <Loading />

      <ProSidebar
        style={{ position: isNonMobile ? Position : undefined }}
        collapsed={isCollapsed}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          <MenuItem
            onClick={() => {
              setPosition("absolute");
              setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              position: "fixed",
              width: "80px",
              top: "0",
              boxShadow: "-5px 0 3px 0 #544c4c",
              backgroundColor: `${colors.primary[1000]}`,
              zIndex: "999",
            }}
          ></MenuItem>
          {!isCollapsed && (
            <MenuItem
              onClick={() => {
                setPosition("relative");
                setIsCollapsed(!isCollapsed);
              }}
              style={{
                position: "fixed",
                width: "270px",
                top: "0",
                boxShadow: "-5px 0 3px 0 #544c4c",
                backgroundColor: `${colors.primary[1000]}`,
                zIndex: "999",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  color={colors.typography[100]}
                  variant="h3"
                  fontWeight="bold"
                >
                  ADMINS
                </Typography>
                <IconButton>
                  <MenuOpenIconIcon />
                </IconButton>
              </Box>
            </MenuItem>
          )}

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px" mt="65px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Avatar
                  alt="profil-images"
                  src={app.profile.url}
                  sx={{
                    width: "100px",
                    height: "100px",
                    border: `3px solid ${colors.primary[400]}`,
                  }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color="#fff"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {app.profile.nama_pengguna}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box
            sx={{ marginTop: isCollapsed ? "65px" : undefined }}
            paddingLeft={isCollapsed ? undefined : "10%"}
          >
            {/* <SubMenu title="Components" icon={<PeopleOutlinedIcon />}>
              <MenuItem>Component 1</MenuItem>
              <MenuItem>Component 2</MenuItem>
            </SubMenu> */}
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="User Management"
              to="/userManagement"
              icon={<GroupIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" color="#fff" sx={{ m: "15px 0 5px 20px" }}>
              Data
            </Typography>
            <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" color="#fff" sx={{ m: "15px 0 5px 20px" }}>
              Pages
            </Typography>
            <Item
              title="Profil Form"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" color="#fff" sx={{ m: "15px 0 5px 20px" }}>
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>

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
      {/* <Backdrop
        color="success"
        sx={{
          backgroundColor: "#fff",
          zIndex: 9999,
        }}
        open={app.backdrop.open}
        onClose={app.backdrop.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </Box>
  );
};

export default Sidebar;
