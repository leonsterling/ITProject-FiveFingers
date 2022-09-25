/**
 * @fileoverview The form that parses the username and password for making a
 *               valid authentication
 * Uses:
 * - React for rendering HTML
 * - Axios for getting information from the serverside
 * - Universal Cookie for handling browser cookies and validating logins
 * - Iconify for adding icons
 */

// Imports of packages
import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Icon } from "@iconify/react";

// Style-based imports
import "./login.css";

// Cookies for checking if the user is currently logged in
const cookies = new Cookies();

// login states for adding CSS coloring on top of the CSS class "inputClass"
/** {{initial: string, invalid: string, valid: string}} */
const states = {
  initial: "login-initial",
  invalid: "login-invalid",
  valid: "login-valid",
};

/** {{login-initial: string, login-invalid: string, login-valid: string}} */
const feedbackMapper = {
  "login-initial": "",
  "login-invalid": "Invalid username or password. Please try again",
  "login-valid": "Successfully logged in!",
};

/**
 * The component that contains the form data, stores the username and password
 * and compares it against the database credentials
 * @return {React.Component}
 */
export default function LoginForm() {
  // const navigate = useNavigate();
  /** {{isValid: boolean, currState: string}} */
  let [loginState, setLoginState] = useState({
    isValid: false,
    currState: states.initial,
  });

  const /** string */ [username, setUserName] = useState("");
  const /** string */ [password, setPassword] = useState("");

  /**
   * Requests the server-side to check the provided credentials and responds
   * in the client-side accordingly
   * @param e The javascript event
   */
  async function handleLogin(e) {
    /** {{
     *     method: string,
     *     url: string,
     *     data: {{
     *        username: string,
     *        password: string
     *     }}
     *  }} */
    const configuration = {
      method: "post",
      url: "http://localhost:5100/login",
      data: {
        username,
        password,
      },
    };

    // prevent the form from refreshing the whole page
    e.preventDefault();

    // make the API call
    await axios(configuration)
      .then((res) => {
        // set the cookie upon successful login
        cookies.set("TOKEN", res.data.token, {
          path: "/",
        });
        inputClass = res.data.isValid ? states.valid : states.invalid;
        setLoginState({
          currState: inputClass,
          isValid: res.data.isValid,
        });
      })
      .catch((err) => {
        // Login returned an invalid input
        console.log("fail login");
        inputClass = states.invalid;
        setLoginState({
          currState: inputClass,
          isValid: false,
        });
        console.log(err);
      });
  }

  if (loginState.isValid) {
    window.location.href = "/dashboard";
  }

  let inputClass /** string */;
  inputClass = "input-field " + loginState.currState;
  let /** string */ feedbackMessage = feedbackMapper[loginState.currState];

  return (
    <form action="/login" method="post" onSubmit={(e) => handleLogin(e)}>
      <ul>
        <li>
          <label> Username </label>
        </li>
        <li className={inputClass}>
          <span>
            <Icon icon="codicon:mail" />
          </span>
          <input
            type="text"
            id="userName"
            onChange={(e) => setUserName(e.target.value)}
          />
        </li>
        <li>
          <label> Password </label>
        </li>
        <li className={inputClass}>
          <span>
            <Icon icon="codicon:lock-small" />
          </span>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>
            <Icon className="password-toggle" icon="bi:eye-slash-fill" />
          </span>
        </li>
        <li className="forget-password-link">
          <h5>Forgot password?</h5>
        </li>
        <li>
          <p className="feedback">{feedbackMessage}</p>
        </li>
        <li>
          <button type="submit">Sign In</button>
        </li>
      </ul>
    </form>
  );
}
