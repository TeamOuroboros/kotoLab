// import { StrictMode } from "react";
import { registerSW } from "virtual:pwa-register";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import AppLayout from "./components/AppLayout.jsx";
import LoginForm from "./components/LoginForm.jsx";
import StartForm from "./components/StartForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import ChildRegister from "./components/ChildRegister.jsx";
import Feeling from "./components/Feeling.jsx";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import SettingMain from "./components/SettingMain";
import { Suggetion } from "./components/Suggetion.jsx";
import "./index.css";
import App from "./App.jsx";
import Proposal from "./components/Proposal.jsx";
import State from "./components/State.jsx";
import ConfirmChild from "./components/ConfirmChild";
import ConfirmParent from "./components/ConfirmParent";

registerSW();

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
          <Route path="/main/proposal" element={<Proposal />} />
          <Route path="/main/feeling" element={<Feeling />} />
          <Route path="/main/state" element={<State />} />
          {/* 必要時は以下に各自でRouteを追加 */}
          <Route path="/setting" element={<SettingMain />} />
          <Route path="/suggetion" element={<Suggetion />} />
          <Route path="/confirmchild" element={<ConfirmChild />} />
          <Route path="/confirmparent" element={<ConfirmParent />} />
        </Routes>
      </BrowserRouter>
    </AppLayout>
  </ThemeProvider>
);
