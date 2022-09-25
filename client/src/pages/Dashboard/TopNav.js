/**
 * @fileoverview Abstraction of the main navigation bar (desktop mode)
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 * - React Router for handling client-side routes
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Cookies from "universal-cookie";

// Style-based imports
import "./TopNav.css";

// Data-oriented imports
import logo from "../assets/LS-Logo.png";

// obtain token from cookie
const cookies = new Cookies();

/**
 * The Top nav takes in props that decide whether it should show or not
 * and contains links that the user can use to navigate accordingly
 * @return {React.Component}
 */
function TopNav({ mobileNavOpen, openMobileNav }) {
  /**
   * Removes the cookie that authenticated the login and redirects the user
   * back to the login page
   */
  function logout() {
    cookies.remove("TOKEN", { path: "/" });

    // user redirected to login page
    window.location.href = "/";
  }

  let /** React.Component */ DashboardButton = window.location.href.endsWith(
      "/dashboard"
    ) ? (
      <div className="topnav-button">
        <button
          className="dashboard"
          onClick={() => window.location.reload()}
        >
          Dashboard
        </button>
      </div>
    ) : (
      /* else */ <Link className="topnav-button" to={`/dashboard`}>
        <button className="dashboard">Dashboard</button>
      </Link>
    );

  return (
    <nav className="topnav">
      <div className="topnav-left">
        <img src={logo} alt="Sterling logo" />
        Sterling Family Artefacts
      </div>
      <div className="topnav-right">
        {DashboardButton}

        <Link className="topnav-button" to={`/add-artefact`}>
          <button className="add-artefact">Add Artefact</button>
        </Link>
        <div className="topnav-button" onClick={() => logout()}>
          <button className="logout">
            <Icon
              className="logout-icon-button"
              icon="icon-park-outline:logout"
            />
            Sign Out
          </button>
        </div>
      </div>

      <div className="nav-icon" onClick={() => openMobileNav()}>
        <Icon className="nav-icon-button" icon="charm:menu-hamburger" />
      </div>
    </nav>
  );
}

export default TopNav;
