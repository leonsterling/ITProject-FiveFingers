/**
 * @fileoverview Implements an abstraction to always make sure taht the routes
 *               are properly allocated to its respective components
 * Uses:
 * - React for rendering HTML
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

// Cookies for checking if the user is currently logged in
const cookies = new Cookies();

/**
 * Makes sure the routes are split between authorized (logged in) and
 * unauthorized (logged out) states
 * @return {React.Component}
 */
function AuthRoutes() {
  // obtain user token in the cookiee
  let /** ?string */ token = cookies.get("TOKEN");

  // if user is logged in, proceed to authenticated routes
  // otherwise, redirect user to login page
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthRoutes;
