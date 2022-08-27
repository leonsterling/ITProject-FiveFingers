import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
 
import reportWebVitals from "./reportWebVitals";

import Login from "./components/Login";
import About from "./components/About";
import AuthRoutes from "./components/AuthRoutes";
import Dashboard from "./components/Dashboard";
{/*import App from "./App";*/}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/*<App />*/}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} exact></Route>
        <Route element={<Login />} path="/login" exact></Route>
        <Route element={<About />} path="/about" exact>
          {" "}
        </Route>
        <Route element={<AuthRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" exact>
            {" "}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
