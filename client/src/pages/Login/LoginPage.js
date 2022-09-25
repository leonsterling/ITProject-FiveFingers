/**
 * @fileoverview The very first page the user will see. Asks the user to input
 *               their username credentials and its corresponding password
 * Uses:
 * - React for rendering HTML
 */

// Imports of packages
import React from "react";

// Imports of local components
import LoginForm from "./LoginForm";
import LoginSplash from "./LoginSplash";

// Style-based imports
import "./login.css";

/**
 * Makes the component containing the whole login page, including
 * the splash animation and login form, and mobile version
 * @return {React.Component}
 */
export default function LoginPage() {
  return (
    <div className="login-page">
      <LoginSplash />
      <div className="login-form">
        <SterlingBrand />
        <h1>Sign In</h1>
        <h2>Welcome! Log in to access your personal artefact register.</h2>
        <LoginForm />
      </div>
    </div>
  );
}

/**
 * A component that uses the sterling logo to make a brand for
 * the Sterling Family Artefacts
 * @return {React.Component}
 */
function SterlingBrand() {
  let /** @file The Leon Sterling Logo */ picture =
    require("../../pictures/LSlogo.png");

  return (
    <div className="sterling-brand">
      <img src={picture} />
      <span>Sterling Family Artefacts</span>
    </div>
  );
}
