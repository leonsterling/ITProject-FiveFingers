import React, { useEffect, useState, useCallback } from "react";
// Required component
import Lightbox from "react-awesome-lightbox";
// Required stylesheet
import "react-awesome-lightbox/build/style.css";
import "./PictureMode.css";

import axios from "axios";
import Cookies from "universal-cookie";

import { Link } from "react-router-dom";
// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const PictureMode = () => {
  const [userData, setUserData] = useState(null);
  async function handleDashboard() {
    const configuration = {
      method: "get",
      url: "http://localhost:5100/data",
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
    };

    // make the API call
    const response = await axios(configuration);
    console.log(response);
    if (!response) {
    } else {
      return response;
    }
  }

  useEffect(() => {
    handleDashboard()
      .then((res) => {
        setUserData(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);
  

  let pictures = null;
  if (userData) {
    pictures = userData.map(
      ({ artefactName, artefactImg, _id }) => (
        <Link to={`/${_id}`} className="link-line">
          <div className="card">
            <img src={artefactImg.imgURL} />
            <div className="card-title">
              <p>{artefactName}</p>
            </div>
          </div>
        </Link>
      )
    );
  }

  return (
    <main>
      <div className="main-container">
        <div className="main-cards">{pictures}</div>
      </div>
    </main>
  );
};

export default PictureMode;