import { createContext, useState } from "react";

export const App = createContext({});

function AppContext(props) {
  const [title, setTitle] = useState("title");
  const context = { title, setTitle };
  return <App.Provider value={context}>{props.children}</App.Provider>;
}

export default AppContext;
