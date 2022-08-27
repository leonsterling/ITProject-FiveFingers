import React from 'react';
import './login.css';
import { useNavigate } from 'react-router';
import LoginForm from './LoginForm';
import Cookies from "universal-cookie";

const tokenExists = Boolean((new Cookies()).get("TOKEN"));

export default function LoginPage () {
    const navigate = useNavigate();
    if (tokenExists) {
        navigate('/');
    }

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

