// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LoginForm from "./components/LoginForm.jsx";
import StartForm from "./components/StartForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import ChildRegister from "./components/ChildRegister.jsx";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Feeling from "./components/Feeling.jsx";
import Proposal from "./components/Proposal.jsx";
import State from "./components/State.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/register/children" element={<ChildRegister />} />
      <Route path="/main" element={<App />} />
      <Route path="/main/feeling" element={<Feeling />} />
      <Route path="/main/proposal" element={<Proposal />} />
      <Route path="/main/state" element={<State />} />
      {/* 必要時は以下に各自でRouteを追加 */}
    </Routes>
  </BrowserRouter>
);
