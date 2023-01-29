import { Box } from "@mui/material";
import Header from "../../components/Headers";
import { useContext, useEffect } from "react";
import { App } from "../../contex";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Foother from "../../components/Foothers";
import refreshToken from "../../middleware/RefreshToken";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const app = useContext(App);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken().catch(() => {
      navigate("/");
    });
    app.setTitle("Dashboard");
  });

  return (
    <>
      <Sidebar />
      <main className="content">
        <Topbar />
        <Box
          sx={{
            height: "90%",
            top: "57px",
            position: "relative",
            overflow: "auto",
          }}
          p="20px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Welcome to dashboard" />
          </Box>
        </Box>
        <Foother />
      </main>
    </>
  );
};

export default Dashboard;
