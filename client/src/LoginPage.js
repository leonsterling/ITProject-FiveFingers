import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './login.css';

const states = {
    initial: 'initial',
    invalid: 'invalid',
    valid: 'valid',
};

export default function LoginPage () {
    const [loginState, setLoginState] = useState({
        firstRender: true,
        currState: states.initial,
    });

    function handleValidity() {
        // call backend validity from here and assure it is working
    }

    let inputClass;
    if (loginState.currState === states.initial) {
        inputClass = 'login-' + states.initial;
    }
    else if (loginState.currState === states.invalid) {
        inputClass = 'login-' + states.invalid;
    }
    else if (loginState.currState === states.valid) {
        inputClass = 'login-' + states.valid;
    }

    return (
        <div className='form-template'>
          <form class='login-page' action='/loginData' method='post'>
            <ul>
                <li>
                    <label for='userName'> Username: </label>
                </li>
                <li>
                    <input type='text' id='userName' className={inputClass}/>
                </li>
                <li>
                    <label for='password'> Password: </label>
                </li>
                <li>
                    <input type='password' id='password' className={inputClass}/>
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

