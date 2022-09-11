import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import "./FullView.css";
import larry from "/Users/nicholaswidjaja/Desktop/FFIT/ITProject-FiveFingers/client/src/pages/FullView/larry.jpg"
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const FullView = () => {
  
  const [imgState, setImgState] = useState({
    isOpen: false
  })

  function printer(){
    console.log(imgState.isOpen);
  }

  printer();
  return (
    <>
      <body>
        <h1>View Artefact</h1>

        <div>
          <Lightbox image={larry} title="larry" />
        </div>
      </body>
    </>
  );
};

export default FullView;
{/*
const { _id } = useParams();
  const navigate = useNavigate();
  const [recordData, setRecordData] = useState(null);

  const configuration = {
    method: "get",
    url: "http://localhost:5100/dashboard/${_id}",
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  };

  async function getRecord() {
    const response = await axios(configuration);
    console.log(recordData);
    if (!response) {
    } else {
      return response;
    }
  }

  useEffect(function() {
    getRecord()
      .then((response) => {
        setRecordData(response.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  });

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
    recordPerson = recordData.assoicated;
    recordCategory = recordData.category;
  }
*/}