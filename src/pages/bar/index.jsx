import { Box } from "@mui/material";
import Header from "../../components/Headers";
import BarChart from "../../components/BarChart";
import { useContext, useEffect } from "react";
import { App } from "../../contex";

const Bar = () => {
  const app = useContext(App);

  useEffect(() => {
    app.setTitle("Bar Chart");
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
      <Header title="Bar Chart" subtitle="Simple BarChart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
