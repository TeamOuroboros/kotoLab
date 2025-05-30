// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import LoginForm from "./components/LoginForm.jsx";
// import RegisterForm from "./components/RegisterForm.jsx";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      {/* <Route path="/login" element={<LoginForm />} /> */}
      {/* <Route path="/register" element={<RegisterForm />} /> */}
      <Route path="/" element={<App />} />
      {/* 必要時は以下に各自でRouteを追加 */}
    </Routes>
  </BrowserRouter>
);
