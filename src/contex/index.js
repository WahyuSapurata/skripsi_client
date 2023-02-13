import { createContext, useState } from "react";

export const App = createContext({});

function AppContext(props) {
  const [backdrop, setBackdrop] = useState({ open: true });
  const [title, setTitle] = useState("title");
  const [profile, setProfile] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [loaderProgress, setLoaderProgress] = useState({ show: true });
  const context = {
    title,
    setTitle,
    profile,
    setProfile,
    snackbar,
    setSnackbar,
    backdrop,
    setBackdrop,
    loaderProgress,
    setLoaderProgress,
  };
  return <App.Provider value={context}>{props.children}</App.Provider>;
}

export default AppContext;
