import { Box } from "@mui/material";
import Header from "../../components/Headers";
import PieChart from "../../components/PieChart";
import { useContext, useEffect } from "react";
import { App } from "../../contex";

const Pie = () => {
  const app = useContext(App);

  useEffect(() => {
    app.setTitle("Pie Chart");
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
      <Header title="Pie Chart" subtitle="Simple PieChart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
