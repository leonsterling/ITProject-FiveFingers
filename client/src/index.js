import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css';

import LoginPage from "./pages/Login/LoginPage";
import AuthRoutes from "./components/AuthRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import RecordPage from "./pages/Record/RecordPage";
import Cookies from "universal-cookie";
import FullView from "./pages/FullView/FullView";
import ListView from "./pages/ListView/ListView.js"
import EditPage from "./pages/EditPage/EditPage";

// Cookies for checking if the user is currently logged in
const cookies = new Cookies();

// If not logged in, requesting the TOKEN returns null
const isLoggedIn = cookies.get("TOKEN");
const path = isLoggedIn ? "/dashboard" : "/login";

// To render the page on the client-side
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={path} />} exact></Route>
        <Route
          element={
            isLoggedIn ?
              <Navigate to={path} /> :
              <LoginPage />
          }
          path="/login"
          exact
        ></Route>
        <Route element={<AuthRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" exact>
            {" "}
          </Route>
          <Route element={<ListView/>} path="/list-view" exact>
            {" "}
          </Route>
          <Route element={<FullView />} path="/full-view/:_id" exact>
            {" "}
          </Route>
          <Route element={<RecordPage />} path="/add-artefact" exact>
            {" "}
          </Route>
          <Route element={<EditPage />} path="/edit-artefact/:id" exact>
            {" "}
          </Route>
       
       </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
