import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Headers";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import { useContext, useEffect } from "react";
import { App } from "../../contex";

const FAQ = () => {
  const app = useContext(App);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    app.setTitle("FAQ Page");
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
      <Header title="FAQ" subtitle="Frequently Asked Question Page" />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            An Important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            impedit deserunt sunt corrupti, sed cumque aliquid ipsa beatae
            minima corporis fugiat molestias numquam soluta. Quam ab libero
            excepturi tempore dolorem!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            An Important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            impedit deserunt sunt corrupti, sed cumque aliquid ipsa beatae
            minima corporis fugiat molestias numquam soluta. Quam ab libero
            excepturi tempore dolorem!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            An Important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            impedit deserunt sunt corrupti, sed cumque aliquid ipsa beatae
            minima corporis fugiat molestias numquam soluta. Quam ab libero
            excepturi tempore dolorem!
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            An Important question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            impedit deserunt sunt corrupti, sed cumque aliquid ipsa beatae
            minima corporis fugiat molestias numquam soluta. Quam ab libero
            excepturi tempore dolorem!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
