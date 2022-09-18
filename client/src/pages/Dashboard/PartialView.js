import React, { useEffect, useState, useCallback } from "react";
// Required component
import Lightbox from "react-awesome-lightbox";
// Required stylesheet
import "react-awesome-lightbox/build/style.css";
import "./PartialView.scss";

import axios from "axios";
import Cookies from "universal-cookie";

import { Link } from "react-router-dom";
// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const PartialView = ({ title, image, desc, date, _id }) => {
  return (
    <div className="partial-view">
      <div className="image-side">
        <img className="image-partial-view" src={image.imgURL} />
      </div>

      <div className="info-side">
        <Link to={`/${_id}`}>
          <p>{title}</p>
        </Link>

        <p>{desc}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default PartialView;

/*
    <div className="partial-view">
        <p>testing for content</p>
        <div className="image-side">
            <img className="image-partial-view" src={openPartial.artefactImg.imgURL}/>
        </div>
        <div className="info-side">
            <p>{openPartial.artefactName}</p>
            <p>{openPartial.description}</p>
            <p>{openPartial.artefactDate}</p>
        </div>
    </div>

           <div className="dd-wrapper">
        <div 
            className="dd-header" 
            role="button" 
            onKeyPress={() => toggle(!open)} 
            onClick={() => toggle(!open)}
        >
            <div className="dd-header__title">
                <p className="dd-header__title--bold">{title}</p>
            </div>
            <div className="dd-header__action">
                <p>{open ? 'Close' : 'Open'}</p>
            </div>
        </div>
    </div>
const itemsInput = [
    {
      id: 1,
      value: 'Pulp Fiction',
    },
    {
      id: 2,
      value: 'The Prestige',
    },
    {
      id: 3,
      value: 'Blade Runner 2049',
    },
  ];

*/
