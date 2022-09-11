import React from 'react';
import './splash.css';

export default function LoginSplash() {
    /* Since it is a static image, it makes sense to store it
     * in the client-side */
    const sterlingLogo = require('../../pictures/LSlogo.png');
    return (
      <div className='login-splash'>
        <div className='imgCenter'>
          <div className="titled-logo">
            <img src={sterlingLogo} alt='Sterling Logo' />
            <h1>Sterling Family Artefacts</h1>
          </div>
        </div>
        <div className='circle-wrapper'>
          <div className='left-circle'></div>
          <div className='right-circle'></div>
        </div>
      </div>
    )
}

