import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router';
import axios from 'axios';

const states = {
    initial: 'login-initial',
    invalid: 'login-invalid',
    valid: 'login-valid',
};


export default function LoginPage () {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState({
        firstRender: true,
        currState: states.initial,
    });
    const [username, setUserName] = useState("");
    const [password ,setPassword] = useState("");

    function handleRegister (e) {
      // set configurations
      const configuration = {
        method: "post",
        url: "http://localhost:5000/register",
        data: {
          username,
          password,
        },
      };

      // make the API call
      axios(configuration)


      // prevent the form from refreshing the whole page
      e.preventDefault();

    }

    async function handleLogin (e) {
      // set configurations
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
          const reponseData = res.data;
          inputClass = (reponseData.isValid) ? states.valid : states.invalid;
          console.log(inputClass);
          setLoginState({ currState: inputClass });
      }).catch((err) => {
          console.log(err);
      });
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

    return (
        <div className='form-template'>
          <form class='login-page' action='/login' method='post'>
            <ul>
                <li>
                    <label for='userName'> Username: </label>
                </li>
                <li>
                    <input
                        type='text'
                        id='userName'
                        className={inputClass}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </li>
                <li>
                    <label for='password'> Password: </label>
                </li>
                <li>
                    <input
                        type='password'
                        id='password'
                        className={inputClass}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </li>
                <li>
                    <button onClick={(e) => handleRegister(e)}>Register</button>
                    <button onClick={(e) => handleLogin(e)}>Log-In</button>
                </li>
            </ul>
          </form>

          <button onClick={() => setLoginState({currState: states.valid})}>
            Valid Button
          </button>

          <button onClick={() => setLoginState({currState: states.invalid})}>
            Invalid Button
          </button>

          <button onClick={() => setLoginState({currState: states.initial})}>
            Initial State
          </button>
        </div>
    )
}

