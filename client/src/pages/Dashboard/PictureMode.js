/**
 * @fileoverview The Picture-Mode component in the Dashboard page, showcasing:
 *               - all the pictures contained in each artefact
 *               - the option to expand each picture to a partial view (its
 *                 own component)
 * Uses:
 * - React for rendering HTML
 * - Axios for getting information from the serverside
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

// Imports of local components
import PartialView from "./PartialView";
import Skewer from "../../components/Skewer";

// Style-based imports
import "./PictureMode.scss";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

/**
 * The Picture mode component, which does 2 things
 * - stores the ID of the currently expanded picture and
 * - renders each userData atom into its own pictorial component
 * @return {React.Component}
 */
function PictureMode ( { userData, setUserData, handleDashboard } ) {
  const /** string */ [currID, setCurrID] = useState("");

  /**
   * After rendering the basic component (without data), it calls the pre-set
   * callback function to fetch and set the data accordingly
   */
  useEffect(() => {
    handleDashboard()
      .then((res) => {
        setUserData(res.data.artefactRecords);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const /** boolean */ [open, setOpen] = useState(false);

  /**
   * Opens and closes the clicked/tapped artefact image to show its respective
   * partial view (see `PartialView.js` for more about partial view)
   */
  function openFunction (id) {
    // Change the state of the visibility to true
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
 
  let /** ?Array<React.Compoent> */ pictures = null;
  if (userData) {
    console.log({userData});
    pictures = userData.map(
      ({ artefactName, artefactImg, description, artefactDate, _id }) => (
        <article key={_id}
          className="card-container"
          onClick={() => openFunction(_id)}
          style={{ padding: open[_id] ? '0 0 480px 0' : '0 0 0 0' }}
        >
          <div>
            <div className="card">
              <img src={artefactImg.imgURL} alt=''/>
              <div className="card-title">
                  {artefactName}
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
