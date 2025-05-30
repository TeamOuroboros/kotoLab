import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import LoginForm from "./components/LoginForm.jsx";
// import RegisterForm from "./components/RegisterForm.jsx";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import SettingMain from "./components/SettingMain";
import { Suggetion } from "./components/Suggetion.jsx";
import "./index.css";
import App from "./App.jsx";
import ConfirmChild from "./components/ConfirmChild";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      {/* <Route path="/login" element={<LoginForm />} /> */}
      {/* <Route path="/register" element={<RegisterForm />} /> */}
      {/* <Route path="/records" element={<App />} /> */}
      {/* 必要時は以下に各自でRouteを追加 */}
      <Route path="/setting" element={<SettingMain />} />
      <Route path="/suggetion" element={<Suggetion />} />
      <Route path="/confirmchild" element={<ConfirmChild />} />
    </Routes>
  </BrowserRouter>
);
