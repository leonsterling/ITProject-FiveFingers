

import React, { useEffect, useState, useCallback } from "react";
// Required component
import Lightbox from "react-awesome-lightbox";
// Required stylesheet
import "react-awesome-lightbox/build/style.css";
import "./PictureMode.css";
import PartialView from "./PartialView";

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
        setUserData(res.data.artefactRecords);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const [open, setOpen] = useState(false);
  const [noClick, setStyle] = useState("");

  function openFunction (id) {
    setOpen({
      ...open,
      [id]: !open[id],
    });

    setStyle({
      ...noClick,
      [id]: "card-expanded"[id],
    });
  }



  let pictures = null;
  if (userData) {
    pictures = userData.map(
      ({ artefactName, artefactImg, description, artefactDate, _id }) => (
        <div 
          key={_id}
          role="button" 
          className="button-partial-view" 
          onKeyPress={() => openFunction(_id)} 
          onClick={() => openFunction(_id)}
        >
          <div className="card">
            <img src={artefactImg.imgURL} />
            <div className="card-title">
              <Link to={`/${_id}`} >
                <p>{artefactName}</p>
              </Link>
              
            </div>
          </div>

          <div style={{ display: open[_id] ? 'block' : 'none' }}>
            <PartialView title={artefactName} image={artefactImg} desc={description} date={artefactDate} id ='${_id}'/>
          </div>
        </div>
      )
    );
    
  }

  return (
    <main>
      <div className="main-container">
        <div className="main-cards">
          {pictures}
        </div>
      </div>
    </main>
  );
};

export default PictureMode;