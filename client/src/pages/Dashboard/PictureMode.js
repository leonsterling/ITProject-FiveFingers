

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

  function openFunction (id) {
    setOpen({
      ...open,
      [id]: !open[id],
    });
  }

  const [clicked, setClicked] = useState(new Array(3).fill(false));
  function openClick (event, id) {
    let result = [...clicked];
    result= result.map(x => false); // reset previous click
    result[id] = true;
    setClicked(result);
 }  

//          style={{ padding: open[_id] ? '0 0 480px 0' : '0 0 0 0' }}
  let pictures = null;
  if (userData) {
    pictures = userData.map(
      ({ artefactName, artefactImg, description, artefactDate, _id }) => (
        <article 
          className="card-container"
          onClick={() => openFunction(_id)}
          style={{ padding: open[_id] ? '0 0 480px 0' : '0 0 0 0' }}
        >
          <div>
            <div className="card">
              <img src={artefactImg.imgURL} />
              <div className="card-title">
                <Link to={`/${_id}`} >
                  <p>{artefactName}</p>
                </Link>
              </div>
            </div>

            <div style={{ display: open[_id] ? 'block' : 'none' }}>
            <PartialView title={artefactName} image={artefactImg} desc={description} date={artefactDate} _id={_id} />
            </div>
          </div>
        </article>
      )
    );
    
  }

  return (
    <main>
      <div className="main-container">
        <div className="main-cards">
          <div className="section-cards">
            <div className="feed-cards">
              {pictures}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PictureMode;
