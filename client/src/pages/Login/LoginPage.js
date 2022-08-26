import React from 'react';
import './login.css';
import LoginForm from './LoginForm';

export default function LoginPage () {
    const showcaseImage = require("./temp.jpg");
    return (
        <div class='login-page'>
          <img src={showcaseImage} alt="Artifacts of Leon Sterling"/>
          <div>
            <h1>Sign In</h1>
            <h2>Welcome! Log in to access your personal artefact register</h2>
            <LoginForm />
          </div>
        </div>
    )
}

