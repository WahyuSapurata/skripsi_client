import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppContext from "./contex";
// import Topbar from "./pages/global/Topbar";
// import Sidebar from "./pages/global/Sidebar";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Team from "./pages/team";
import Contacts from "./pages/contacts";
import Invoices from "./pages/invoices";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import FAQ from "./pages/faq";
import Bar from "./pages/bar";
import Pie from "./pages/pie";
import Line from "./pages/line";
// import Geography from "./pages/geography";

import Login from "./pages/login";
// import { useEffect } from "react";
// import refreshToken from "./middleware/RefreshToken";

function App() {
  const [theme, colorMode] = useMode();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   refreshToken().catch(() => {
  //     navigate("/");
  //   });
  // }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContext>
          <div className="app">
            {/* <Sidebar /> */}
            {/* <main className="content"> */}
            {/* <Topbar /> */}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              {/* <Route path="/geography" element={<Geography />} /> */}
            </Routes>
            {/* </main> */}
          </div>
        </AppContext>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
