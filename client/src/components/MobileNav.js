/**
 * @fileoverview Abstraction of the Navbar component; the component that the user sees
 *               when they view the page in their mobile device
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 * - React Router for handling client-side routes
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

// Style-based imports
import "./MobileNav.css";

// obtain token from cookie
const cookies = new Cookies();

/**
 * The mobile nav takes in props that decide whether it should show or not
 * and contains links that the user can use to navigate accordingly
 * @return {React.Component}
 */
function MobileNav({ mobileNavOpen, closeMobileNav }) {
  /**
   * Removes the cookie that authenticated the login and redirects the user
   * back to the login page
   */
  function logout() {
    cookies.remove("TOKEN", { path: "/" });

    // user redirected to login page
    window.location.href = "/";
  }

  let /** React.Component */ DashboardButton = window.location.href.includes(
      "/dashboard"
    ) ? (
      <span
        className="mobilenav-link"
        onClick={() => window.location.reload()}
      >
        Dashboard
      </span>
    ) : (
      /* else */ 
      <Link className="mobilenav-link" to={`/dashboard`}>
        Dashboard
      </Link>
    );

  return (
    <div className={mobileNavOpen ? "mobilenav-responsive" : ""}
      id="mobilenav"
    >
      <div className="mobilenav-exit">
        <Icon
          icon="akar-icons:cross"
          id="exitNavIcon"
          onClick={() => closeMobileNav()}
        />
      </div>

      <div className="mobilenav-content">
        <Link className="mobilenav-link" to={`/dashboard`}>
          Dashboard
        </Link>
        <Link className="mobilenav-link" to={`/add-artefact`}>
          Add Artefact
        </Link>
        <div className="mobilenav-link">
          <i>
            <Icon icon="icon-park-outline:logout" />
          </i>
          <span onClick={() => logout()}>Sign Out</span>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
