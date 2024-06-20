import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./theme";
import { AuthProvider } from "./context/authContext";
import "./global.css";
import { GlobalProvider } from "./context/globalContex";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </GlobalProvider>
    </ThemeProvider>
  </React.StrictMode>
);
