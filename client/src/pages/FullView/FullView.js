import React, { useState, useEffect } from "react";
import FsLightbox from "fslightbox-react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import "./FullView.css";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function FullView() {
  // if toggler is updated when lightbox is closed it will open it
  // if toggler is updated when lightbox is opened it will close it
  const [toggler, setToggler] = useState(false);
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
    //console.log(recordData);
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
    recordPerson = recordData.associated;
    recordCategory = recordData.category;
  }

  return (
    <>
      <body>
        <div className = "header-fv">Full View</div>
        <div className="img-container">
          <img className="cropped-ofp" src={recordImg} alt={recordName}  onClick={() => setToggler(!toggler)}/>
          <p className="artefact-name">{recordName}</p>
          <p className="artefact-tags">TestTag</p>
          <FsLightbox toggler={toggler} sources={[recordImg]} />
        </div>

        <div>
            <div>
                {recordDescription}
            </div>
            <div>
                {recordCategory}
            </div>
        </div>
      </body>
    </>
  );
}

export default FullView;
