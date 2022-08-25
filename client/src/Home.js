import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

export default function Home () {
    return (
        <>
          <h1>Welcome</h1>
          <Link to='/login'>Login Page</Link>
        </>
    )
}

