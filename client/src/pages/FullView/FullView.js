// Import React and Hooks
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Lightbox Import
import FsLightbox from "fslightbox-react";

import axios from "axios";
import Cookies from "universal-cookie";
import "./FullView.css";
import {Larry} from "./larry.jpg";

// Import Authentication and Cookies
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function FullView() {
  // if toggler is updated when lightbox is closed it will open it
  // if toggler is updated when lightbox is opened it will close it
  const [toggler, setToggler] = useState(false);

  // id constant to send request based on the specific artefact id
  const { _id } = useParams();

  const navigate = useNavigate();

  // State to update the recordData of the artefact
  const [recordData, setRecordData] = useState(null);

  let ArtefactID = null;
  ArtefactID = JSON.stringify({ _id }._id);
  console.log(ArtefactID);
  const configuration = {
    method: "get",
    url: `https://sterlingfamilyartefacts.herokuapp.com/${_id}`,
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  };

  console.log("URL =" + configuration.url);

  // Get Function to retirev the artefact data
  async function getRecord() {
    const response = await axios(configuration);

    //console.log(recordData);
    if (!response) {
    } else {
      return response;
    }
  }

  useEffect(function () {
    getRecord()
      .then((response) => {
        setRecordData(response.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  // Store the artefact data in a list of variable
  let recordName,
    recordImg,
    recordDescription,
    recordMemories,
    recordLocation,
    recordPerson,
    recordCategory = null;

  if (recordData) {
    recordName = recordData.artefactName;
    recordImg = recordData.artefactImg.imgURL;
    recordDescription = recordData.description;
    recordMemories = recordData.memories;
    recordLocation = recordData.location;
    recordPerson = recordData.associated.person;
    recordCategory = recordData.category.category_name;
  }

  return (
        <div>
          <div className="header-fv">Full View</div>
          <div className="img-container">
            <img
              className="cropped-ofp"
              src={recordImg}
              alt={recordName}
              onClick={() => setToggler(!toggler)}
            />
            <p className="artefact-name">{recordName}</p>
            <p className="artefact-tags">TestTag</p>
            <FsLightbox toggler={toggler} sources={[{Larry}]} />
          </div>
          <div>
            <div>{recordDescription}</div>
            <div>{recordCategory}</div>
            <div>{recordPerson}</div>
          </div>
        </div>
  );
}

export default FullView;
