import React, { useEffect, useState } from "react";
// Required stylesheet
import "./PictureMode.css";
import PartialView from "./PartialView";

import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const PictureMode = ( { userData, setUserData, handleDashboard } ) => {

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

  let pictures = null;
  if (userData) {
    console.log({userData});
    pictures = userData.map(
      ({ artefactName, artefactImg, description, artefactDate, _id }) => (
        <article 
          className="card-container"
          onClick={() => openFunction(_id)}
          style={{ padding: open[_id] ? '0 0 480px 0' : '0 0 0 0' }}
        >
          <div>
            <div className="card">
              <img src={artefactImg.imgURL} alt=''/>
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
