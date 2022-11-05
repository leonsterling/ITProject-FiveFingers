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
import React, { useState } from "react";

// Imports of local components
import PartialView from "./PartialView";
import Skewer from "../../../components/Skewer";

// Style-based imports
import "./PictureMode.scss";

/**
 * The Picture mode component, which does 2 things
 * - stores the ID of the currently expanded picture and
 * - renders each userData atom into its own pictorial component
 * @return {React.Component}
 */

function PictureMode({
  userData,
  setUserData,
  currPageNum,
  setCurrPageNum,
  setNumPages,
  mode
}) {
  const /** string */ [currID, setCurrID] = useState("");

  const /** boolean */ [open, setOpen] = useState(false);

  const /** string */ [hoverID, setHoverID] = useState("");
  const /** boolean */ [hover, setHover] = useState(false);

  /**
   * Opens and closes the clicked/tapped artefact image to show its respective
   * partial view (see `PartialView.js` for more about partial view)
   */
  function openFunction(id) {
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

  function hoverFunction(id) {
    // Change the state of the visibility to true
    if (hoverID.length !== 0) {
      setHover({
        [hoverID]: !hover[hoverID],
      });
    }
    setHover({
      [id]: !hover[id],
    });
    setHoverID(id);
  }

  let /** ?Array<React.Compoent> */ pictures = null;
  if (userData) {
    pictures = userData.map(
      ({ artefactName, artefactImg, description, artefactDate, _id }) => (
        <article
          key={_id}
          className="card-container"
          onMouseEnter={() => hoverFunction(_id)}
          onMouseLeave={() => hoverFunction(_id)}
          style={{ padding: open[_id] ? "0 0 600px 0" : "0 0 0 0" }}
        >
          <div>
            <div className="card-wrapper">
              <div
                className="card-hover"
                
              >
                {/* style={{ display: hover[_id] ? "block" : "none" }} */}
                <Skewer
                  _id={_id}
                  setUserData={setUserData}
                  currPageNum={currPageNum}
                  setCurrPageNum={setCurrPageNum}
                  setNumPages={setNumPages}
                  mode={mode}
                />
              </div>

              <div className="card">
                <img
                  src={artefactImg.imgURL}
                  alt=""
                  onClick={() => openFunction(_id)}
                />
                <div className="card-title">{artefactName}</div>
              </div>
            </div>

            <div style={{ display: open[_id] ? "block" : "none" }}>
              <PartialView
                title={artefactName}
                image={artefactImg}
                desc={description.substring(0, 250)}
                date={artefactDate}
                _id={_id}
                openFunction={openFunction}
                setUserData={setUserData}
                currPageNum={currPageNum}
                setCurrPageNum={setCurrPageNum}
                setNumPages={setNumPages}
                mode={mode}
              />
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
            <div className="feed-cards">{pictures}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PictureMode;
