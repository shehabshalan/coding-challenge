import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { DataProvider } from "./context/DataContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserAuthContextProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </UserAuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
