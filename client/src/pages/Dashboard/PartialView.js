import React from "react";

import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

// Required stylesheet
import "react-awesome-lightbox/build/style.css";
import "./PartialView.scss";

const PartialView = ({ title, image, desc, date, _id }) => {
  return (
        <figure className="partial-view">
            <div className="image-side">
                <img className="image-partial-view"
                  src={image.imgURL} alt='the partial view of the component'/>
            </div>
            <div className="info-side">
                <div className="info-title">
                    <p>{title}</p>
                </div>
                <div className="info-dec">
                    <p>Description:</p>
                    <br></br>
                    <p>{desc}</p>
                </div>
                <div className="info-date">
                    <p>{date}</p>
                </div>
                <div className="info-more">
                    <Link to={`/full-view/${_id}`} className="link-line">
                        <p>Click to Display Full View
                        <Icon className="redirect-icon" icon="bi:box-arrow-in-down-right" flip="vertical"/>
                        </p>
                    </Link>
                </div>
            </div>
        </figure>
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
