import './viewDummy.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const viewSates = {
    gallery : "dashboard-gallery",
    list : "dashboard-list",
}

// dummy dashboard page
export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [view, setView] = useState(viewSates.gallery);

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

  let data = require('./data.json').data;
  console.log(data);

  // Emulating grid with list view
  let dataComponents = data.map((currData, index) => {
      return (
          <li>{currData.Name}</li>
      )
  });

  function changeView() {
      setView( (view === viewSates.gallery) ? viewSates.list : viewSates.gallery )
  }

  console.log(message);

  return (
    <>
      <h1>This is your Dashboard</h1>

      <h3>Halo {message.username}</h3>

      <ul className={view}>
        {dataComponents}
      </ul>

      <button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </button>
      <button onClick={() => changeView()}>Change button</button>
    </>
  );
}
