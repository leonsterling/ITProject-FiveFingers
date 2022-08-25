import './App.css';
import React from 'react';
import LoginPage from './LoginPage';
import {
    Route,
    Routes,
    useRoutes
} from "react-router-dom";

function App() {
  const Paths = () => {
      let routes = useRoutes([
        { path: "login", element: <LoginPage /> },
        // ...
      ]);
      return routes;
  }

  return (
    <div className="App">
      <LoginPage/>
    </div>
  );
}

export default App;
