import React, { useEffect, useState, useCallback } from 'react';

import "./PictureMode.css";
import Nayeon from "../assets/Nayeon.JPG";

import axios from "axios";
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");


/*
    
const Artefact = (props) => (
    <tr>
      <td>{props.artefact.artefact_name}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.artefact._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            //props.deleteRecord(props.artefact._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
    const artefactSchema = new mongoose.Schema({
        artefact_name: {type: String},
        artefact_description: {type: String},
        artefact_location: {type: String},
        artefact_date_created: {type: Date, default: new Date()},
        artefact_date_origin: {type: Date},
        artefact_images: [imageSchema],
        artefact_tags: [tagSchema]
     });
    
)
*/

const PictureMode = () => {
  const [userData, setUserData] = useState(null);
  async function handleDashboard() {
    const configuration = {
      method: "get",
      url: "http://localhost:5100/dashboard",
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
    };

    // make the API call
    const response = await axios(configuration)
    console.log(response)
    if (!response){

    }
    else {
      return response
    }
  }

  useEffect(() => {
    handleDashboard().then((res) => {
      setUserData(res.data.user)
    }).catch((e)=> {
      console.log(e.message)
    })
  }, [])

  let pictures = null;
  if (userData) {
      pictures = userData.artefactList.map(({artefactName, artefactImg}) => (
        <div className="card">
          <img src={artefactImg.imgURL} />
          <div className="card-title">
          <p>{artefactName}</p>
          </div>
        </div>
      ));
  }
  
  return (
    <main>
      <div className="main-container">

        <div className="main-cards">
          {pictures} 
        </div>

      </div>
    </main>
  );
};

export default PictureMode;
