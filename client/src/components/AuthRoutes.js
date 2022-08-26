import React from "react";
import {Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const AuthRoutes = () => {

  // obtain user token in the cookiee
  let token = cookies.get("TOKEN");

  // if user is logged in, proceed to authenticated route
  // otherwise, redirect user to login page
  return ( token ? <Outlet/> : <Navigate to ='/login' />)}
  
export default AuthRoutes