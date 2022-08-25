import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [username, setRegisterUsername] = useState("");
  const [password, setRegisterPassword] = useState("");

  const [loggedUsername, loguser] = useState("");
  const [loggedPassword, logpassword] = useState("");

  const [data, setData] = useState(null);


  const handleSubmit = (e) => {

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

  const handleLogin = (e) => {

    // set configurations
  const configuration = {
    method: "post",
    url: "http://localhost:5000/login",
    withCredentials: true,
    data: {
      username: loggedUsername,
      password: loggedPassword,
    },
  };

    // make the API call
    axios(configuration)
    

      // prevent the form from refreshing the whole page
    e.preventDefault();
  
  }

  const handleLogout = (e) => {
     // set configurations
    const configuration = {
    method: "post",
    url: "http://localhost:5000/logout",
    withCredentials: true,
  };

  axios(configuration)

  e.preventDefault()
  }

  const handleUser = (e) => {

    // set configurations
  const configuration = {
    method: "get",
    url: "http://localhost:5000/getUser",
    withCredentials: true,
    data: {
      username,
      password,
    }, 
  };
   // instead of using a 'post'?
    // make the API call
    axios(configuration).then((res) => {
      setData(res.data);
      console.log(res.data)})
    

      // prevent the form from refreshing the whole page
    e.preventDefault();
  
  }

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(e) => loguser(e.target.value)}
        />
        <input
          placeholder="password"
          onChange={(e) => logpassword(e.target.value)}
        />
        <button onClick={(e) => handleLogin(e)}>Log-In</button>
        <button onClick={(e) => handleLogout(e)}>Log-Out</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={(e) => handleUser(e)}>Submit</button>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div>
    

   
    </div>
  );
}

export default App;
