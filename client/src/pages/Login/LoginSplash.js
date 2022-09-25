/**
 * @fileoverview The component that renders the fancy animation splash
 * Uses:
 * - React for rendering HTML
 */

// Imports of packages
import React from "react";

// Style-based imports
import "./splash.css";

/**
 * Renders divs in a way that obeys `splash.css` to do an animation
 */
export default function LoginSplash() {
  /* Since it is a static image, it makes sense to store it
   * in the client-side */
  /** @file The Leon Sterling logo */
  const sterlingLogo = require("../../pictures/LSlogo.png");
  return (
    <div className="login-splash">
      <div className="imgCenter">
        <div className="titled-logo">
          <img src={sterlingLogo} alt="Sterling Logo" />
          <h1>Sterling Family Artefacts</h1>
        </div>
      </div>
      <div className="circle-wrapper">
        <div className="left-circle"></div>
        <div className="right-circle"></div>
      </div>
    </div>
  );
}
