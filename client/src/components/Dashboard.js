import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

// dummy dashboard page
export default function Dashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:5000/dashboard",
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setMessage(result.data.user);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  // logout function
  const logout = () => {
    // cookie removed
    cookies.remove("TOKEN", { path: "/" });
    // user redirected to login page
    window.location.href = "/";
  };

  return (
    <>
      <h1>This is your Dashboard</h1>

      <h3>Halo {message.username}</h3>

      <button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </button>
    </>
  );
}
