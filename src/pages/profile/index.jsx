import { Box, Grid, Paper } from "@mui/material";
import Header from "../../components/Headers";
import { useContext, useEffect } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import Foother from "../../components/Foothers";

const Profile = () => {
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
          <Header title="User Profile" subtitle="Edit user profile" />
          <Box padding="0 30px">
            <Grid container spacing={2}>
              <Grid item xs={6} md={8}>
                <Paper sx={{ p: "15px" }}></Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Foother />
      </main>
    </>
  );
};

export default Profile;
