// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Navigate, Routes } from "react-router";

import "./index.css";
import App from "./App.jsx";
import Feeling from "./components/Feeling.jsx";
import Proposal from "./components/Proposal.jsx";
import State from "./components/State.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/main" element={<App />} />
      <Route path="/main/feeling" element={<Feeling />} />
      <Route path="/main/proposal" element={<Proposal />} />
      <Route path="/main/state" element={<State />} />
    </Routes>
  </BrowserRouter>
);
