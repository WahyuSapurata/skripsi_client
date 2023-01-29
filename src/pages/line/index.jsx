import { Box } from "@mui/material";
import Header from "../../components/Headers";
import LineChart from "../../components/LineChart";
import { useContext, useEffect } from "react";
import { App } from "../../contex";

const Line = () => {
  const app = useContext(App);

  useEffect(() => {
    app.setTitle("Line Chart");
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
      <Header title="Line Chart" subtitle="Simple LineChart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
