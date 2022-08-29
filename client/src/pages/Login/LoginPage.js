import React from 'react';
import './login.css';
import LoginForm from './LoginForm';
import LoginSplash from './LoginSplash';

export default function LoginPage () {
    return (
        <div className='login-page'>
          <LoginSplash />
          <div className='login-form'>
            <h1>Sign In</h1>
            <h2>Welcome! Log in to access your personal artefact register</h2>
            <LoginForm />
          </div>
        </div>
    )
}

