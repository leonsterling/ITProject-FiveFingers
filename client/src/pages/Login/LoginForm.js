import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

const states = {
    initial: 'login-initial',
    invalid: 'login-invalid',
    valid: 'login-valid',
};

export default function LoginForm () {
    const navigate = useNavigate();
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
        url: "http://localhost:5000/login",
        data: {
          username,
          password,
        },
      };

      // prevent the form from refreshing the whole page
      e.preventDefault();

      // make the API call
      await axios(configuration).then((res) => {
          inputClass = (res.data.isValid) ? states.valid : states.invalid;
          setLoginState({
              currState: inputClass,
              isValid: res.data.isValid,
          });
      }).catch((err) => {
          console.log(err);
      });

      console.log("hello there");
    }

    let inputClass;
    if (loginState.currState === states.initial) {
        inputClass = states.initial;
    }
    else if (loginState.currState === states.invalid) {
        inputClass = states.invalid;
    }
    else if (loginState.currState === states.valid) {
        inputClass = states.valid;
    }

    inputClass = 'input-field ' + inputClass

    if (loginState.isValid) {
        navigate('/dashboard');
    }

    return (
          <form action='/login' method='post' onSubmit={(e) => handleLogin(e)}>
            <ul>
                <li>
                    <label> Email </label>
                </li>
                <li className={inputClass}>
                    <span className="material-icons">mail</span>
                    <input
                        type='text'
                        id='userName'
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </li>
                <li>
                    <label for='password'> Password </label>
                </li>
                <li className={inputClass}>
                    <span className="material-icons">lock</span>
                    <input
                        type='password'
                        id='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </li>
                <li>
                    <button type='submit' >Sign In</button>
                </li>
            </ul>
          </form>
    )
}

