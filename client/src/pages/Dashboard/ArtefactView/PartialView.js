/**
 * @fileoverview The Partial View Component in the Dashboard. Shows
 *               slightly-more information of an artefact that was just
 *               clicked/tapped
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 * - React Router for handling client-side routes
 */

// Imports of packages
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

// Imports of local components
import Skewer from "../../../components/Skewer";

// Style-based imports
import "./PartialView.scss";

/**
 * The partial view takes in all the required information as props from its
 * parent component and displays them in a figure HTML tag
 * @return {React.Component}
 */
function PartialView({ title, image, desc, date, _id, openFunction, setUserData, currPageNum, setCurrPageNum, setNumPages, mode }) {

  return (
    <figure className="partial-view">
      <div className="exit-partial">
        <Icon icon="bi:x-lg" color="#f8f8f8" className="exit-button" onClick={()=>openFunction(_id)}/>
      </div>
      <div className="image-side">
        <img
          className="image-partial-view"
          src={image.imgURL}
          alt="the partial view of the component"
        />
      </div>
      <div className="info-side">
        <div className="info-values">
          <h2 className="info-title">
            {title}
          </h2>
          <div className="info-desc">
            <p>
              <span id="p-desc">Description:</span>
              <br/>
              <span className={'grey smaller'}>{(desc) ? desc : "No description given"}</span>
              
            </p>
          </div>
        </div>
        <div className="info-more">
          <Link to={`/full-view/${_id}`} className="link-line">
            <p>
              Click to Display Full View
              <Icon
                className="redirect-icon"
                icon="bi:box-arrow-in-down-right"
                flip="vertical"
              />
            </p>
          </Link>
        </div>
      </div>
      <div className="skewer-partial">
        <Skewer
          _id={_id}
          className="skewer-menu-partial"
          setUserData={setUserData}
          currPageNum={currPageNum}
          setCurrPageNum={setCurrPageNum}
          setNumPages={setNumPages}
          mode={mode}
        />
      </div>
    </figure>
  );
}

export default PartialView;
