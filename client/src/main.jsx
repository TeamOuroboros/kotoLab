import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import AppLayout from "./components/AppLayout.jsx";

import LoginForm from "./components/LoginForm.jsx";
import StartForm from "./components/StartForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import ChildRegister from "./components/ChildRegister.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/register/children" element={<ChildRegister />} />
          <Route path="/main" element={<App />} />
          {/* 必要時は以下に各自でRouteを追加 */}
        </Routes>
      </BrowserRouter>
    </AppLayout>
  </ThemeProvider>
);
