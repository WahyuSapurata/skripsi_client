import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Foother = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p="15px 20px"
      sx={{
        position: "fixed",
        width: "-webkit-fill-available",
        backgroundColor: colors.grey[1000],
        boxShadow: "0 0 8px #888888",
        bottom: "0",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Copyright © 2023. All rights reserved.
      </Typography>
      <Typography variant="h5" color={colors.typography[100]}>
        Version 1.0.0
      </Typography>
    </Box>
  );
};

export default Foother;
