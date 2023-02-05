import { Backdrop, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { App } from "../contex";

const Loading = () => {
  const app = useContext(App);
  // useEffect(() => {
  //   app.setBackdrop({ open: false });
  // }, []);
  return (
    <Backdrop
      color="success"
      sx={{
        backgroundColor: "#fff",
        zIndex: 9999,
      }}
      open={app.backdrop.open}
      onClose={app.backdrop.open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
