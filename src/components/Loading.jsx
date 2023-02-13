import {
  Backdrop,
  Box,
  CircularProgress,
  LinearProgress,
  circularProgressClasses,
} from "@mui/material";
import { useContext } from "react";
import { App } from "../contex";

const Loading = () => {
  const app = useContext(App);
  // useEffect(() => {
  //   app.setBackdrop({ open: false });
  // }, []);
  return (
    // <Backdrop
    //   color="success"
    //   sx={{
    //     backgroundColor: "#fff",
    //     zIndex: 9999,
    //   }}
    //   open={app.backdrop.open}
    //   onClose={app.backdrop.open}
    // >
    //   <CircularProgress color="inherit" />
    // </Backdrop>
    <Box component="main" flexGrow="1">
      {app.loaderProgress.show && (
        <>
          <LinearProgress
            color="success"
            sx={{
              position: "fixed",
              height: "5px",
              borderRadius: "10px",
              width: "100%",
              zIndex: "9999",
              animationDuration: "550ms",
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
          />
        </>
      )}
    </Box>
  );
};

export default Loading;
