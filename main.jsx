
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ResumePreview from "./ResumePreview.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/preview" element={<ResumePreview />} />
    </Routes>
  </BrowserRouter>
);
