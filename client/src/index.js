/**
 * @fileoverview The starting point of the client-side; acts as the `main`
 *               function of most languages
 * Primarily handles the routes that that the browser shows
 * Uses:
 * - React for rendering HTML
 * - ReactDOM for connecting static HTML with React
 * - React Router for handling client-side routes
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

// Imports of local components
import LoginPage from "./pages/Login/LoginPage.js";
import AuthRoutes from "./components/AuthRoutes.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import RecordPage from "./pages/Record/RecordPage.js";
import FullView from "./pages/FullView/FullView.js";
import ListView from "./pages/Dashboard/ArtefactView/ListView.js";
import EditPage from "./pages/EditPage/EditPage.js";
import Skewer from "./components/Skewer.js";
import StressPage from "./stressSimulator/stressSim.js";
// Style-based imports
import "./index.css";

// Cookies for checking if the user is currently logged in
const cookies = new Cookies();

// If not logged in, requesting the TOKEN returns null
const /** ?string */ isLoggedIn = cookies.get("TOKEN");
const /** string */ path = isLoggedIn ? "/dashboard" : "/login";

// To render the page on the client-side
const /** object */ root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={path} />} exact></Route>
        <Route
          element={isLoggedIn ? <Navigate to={path} /> : <LoginPage />}
          path="/login"
          exact
        ></Route>
        <Route element={<AuthRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" exact></Route>
          <Route element={<ListView />} path="/list-view" exact></Route>
          <Route element={<FullView />} path="/full-view/:_id" exact>
          </Route>
          <Route element={<ListView/>} path="/list-view" exact>
            {" "}
          </Route>
          <Route element={<FullView />} path="/full-view/:_id" exact>
            {" "}
          </Route>
          <Route element={<RecordPage />} path="/add-artefact" exact>
          </Route>
          <Route element={<EditPage />} path="/edit-artefact/:_id" exact>
          </Route>
          <Route element={<Skewer />} path="skewer" exact>
          </Route>
          <Route element={<StressPage />} path="stress-page" exact>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
