import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import Cookies from "universal-cookie";
import { Icon } from '@iconify/react';
import usePasswordToggle from './PasswordToggle';

// Cookies for checking if the user is currently logged in
const cookies = new Cookies();

// login states for coloring with "inputClass"
const states = {
    initial: 'login-initial',
    invalid: 'login-invalid',
    valid: 'login-valid',
};

const feedbackMapper = {
    'login-initial' : '',
    'login-invalid' : 'Invalid username or password. Please try again',
    'login-valid' : 'Successfully logged in!',
}

export default function LoginForm () {
    // const navigate = useNavigate();
    let [loginState, setLoginState] = useState({
        isValid: false,
        currState: states.initial,
    });

    const [username, setUserName] = useState("");
    const [password ,setPassword] = useState("");
    
    async function handleLogin (e) {
      // set configurations
      setLoginState({validLogin: false});
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
      await axios(configuration).then((res) => {
        // set the cookie upon successful login
        cookies.set("TOKEN", res.data.token, {
            path: "/",
          }) 
          inputClass = (res.data.isValid) ? states.valid : states.invalid;
          setLoginState({
              currState: inputClass,
              isValid: res.data.isValid,
          });
          
      }).catch((err) => {
        console.log("fail login")
        inputClass = states.invalid;
        setLoginState({
            currState: inputClass,
            isValid: false
        });
          console.log(err);
      });
    }

    if (loginState.isValid) {
        window.location.href = '/dashboard';
    }

    let inputClass;
    inputClass = 'input-field ' + loginState.currState
    let feedbackMessage = feedbackMapper[loginState.currState];

    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
         
    return (
          <form action='/login' method='post' onSubmit={(e) => handleLogin(e)}>
            <ul>
                <li>
                    <label> Username </label>
                </li>
                <li className={inputClass}>
                    <span><Icon icon='codicon:mail'/></span>
                    <input
                        type='text'
                        id='userName'
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </li>
                <li>
                    <label> Password </label>
                </li>
                <li className={inputClass}>
                    <span><Icon icon='codicon:lock-small'/></span>
                    <input
                        type={PasswordInputType}
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="password-toggle">{ToggleIcon}</span>
                </li>
                <li className='forget-password-link'>
                    <h5>Forgot password?</h5>
                </li>
                <li>
                    <p className='feedback'>{feedbackMessage}</p>
                </li>
                <li>
                    <button type='submit' >Sign In</button>
                </li>
            </ul>
          </form>
    )
}

