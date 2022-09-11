import React from 'react';
import './login.css';
import LoginForm from './LoginForm';
import LoginSplash from './LoginSplash';

export default function LoginPage () {
    return (
        <div className='login-page'>
          <LoginSplash />
          <div className='login-form'>
            <SterlingBrand />
            <h1>Sign In</h1>
            <h2>Welcome! Log in to access your personal artefact register</h2>
            <LoginForm />
          </div>
        </div>
    )
}

function SterlingBrand () {
    let picture = require('../../pictures/LSlogo.png');
    return (
        <div className='sterling-brand'>
          <img src={picture} />
          <span>Sterling Family Artefacts</span>
        </div>
    )
}

