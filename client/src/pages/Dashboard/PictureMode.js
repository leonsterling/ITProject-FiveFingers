import React, { useEffect, useState } from "react";
// Required stylesheet
import "./PictureMode.scss";
import PartialView from "./PartialView";

import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Skewer from "../../components/Skewer";
// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const PictureMode = ( { userData, setUserData, handleDashboard } ) => {

  const [currID, setCurrID] = useState("");

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
    // Change the state of the visibility to true
    console.log({currID});
    console.log({id});

    if (currID.length !== 0) {
      setOpen({
        [currID]: !open[currID],
      });
    }
    setOpen({
      [id]: !open[id],
    });
    setCurrID(id);
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
                <Link to={`/full-view/${_id}`} >
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
