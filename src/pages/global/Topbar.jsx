import {
  Box,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import refreshToken from "../../middleware/RefreshToken";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    refreshToken().catch(() => {
      navigate("/");
    });
  }, []);

  function handleLogout() {
    window.location.reload(false);
  }

  const logout = async () => {
    try {
      await axios.delete("http://localhost:3100/logout");
      sessionStorage.removeItem("auth");
      navigate("/");
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: `${colors.greenAccent[500]}`,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: `${colors.primary[100]}`,
      },
      "&:hover fieldset": {
        borderColor: `${colors.greenAccent[500]}`,
      },
      "&.Mui-focused fieldset": {
        borderColor: `${colors.greenAccent[500]}`,
      },
    },
  });

  function ListItemLink(props) {
    const { icon, primary, to } = props;

    return (
      <li>
        <ListItem
          disablePadding
          sx={{ pl: "16px", pr: "16px", color: colors.typography[100] }}
          component={Link}
          to={to}
        >
          {icon ? (
            <ListItemIcon sx={{ minWidth: "35px" }}>{icon}</ListItemIcon>
          ) : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }
  ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p="10px 20px"
      sx={{
        position: "fixed",
        width: "-webkit-fill-available",
        backgroundColor: colors.grey[1000],
        boxShadow: "0 0 8px #888888",
      }}
    >
      {/* Search Bar */}
      <Box display="flex">
        <CssTextField
          label="Search"
          id="outlined-size-small"
          size="small"
          sx={{ flex: 1 }}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <BootstrapTooltip title="search">
            <SearchIcon />
          </BootstrapTooltip>
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" gap="5px">
        <IconButton onClick={colorMode.toggleColorMode}>
          <BootstrapTooltip title="dark mode">
            {theme.palette.mode === "light" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </BootstrapTooltip>
        </IconButton>
        <IconButton>
          <BootstrapTooltip title="notification">
            <NotificationsOutlinedIcon />
          </BootstrapTooltip>
        </IconButton>
        <IconButton
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          sx={{
            borderRadius: "8px",
            border: `1px solid ${colors.typography[100]}`,
            padding: "5px",
          }}
        >
          <BootstrapTooltip title="profil">
            <PersonOutlinedIcon />
          </BootstrapTooltip>
          <Typography
            lineHeight="13px"
            variant="h6"
            ml="5px"
            textAlign="start"
            color={colors.typography[100]}
          >
            Role Admin
            <span style={{ fontSize: "12px", display: "block" }}>
              {sessionStorage.getItem("email_pengguna")}
            </span>
          </Typography>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              <ListItemLink
                to="/profile"
                primary="My Profil"
                icon={<AccountCircleIcon />}
              />
              <Divider />
              <ListItem onClick={logout} disablePadding>
                <ListItemButton sx={{ py: 0, minHeight: 32, color: "red" }}>
                  <ListItemIcon sx={{ minWidth: "35px", color: "red" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      fontSize: 15,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Popover>
      </Box>
    </Box>
  );
};

export default Topbar;
