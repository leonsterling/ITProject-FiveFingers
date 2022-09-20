// Import React and Hooks
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Lightbox Import
import FsLightbox from "fslightbox-react";

import axios from "axios";
import Cookies from "universal-cookie";
import "./FullView.scss";
import Navbar from '../Dashboard/Navbar';

// Import Authentication and Cookies
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function FullView() {
  // if toggler is updated when lightbox is closed it will open it
  // if toggler is updated when lightbox is opened it will close it
  const [toggler, setToggler] = useState(false);

  // id constant to send request based on the specific artefact id
  const { _id } = useParams();
  
  // State to update the recordData of the artefact
  const [recordData, setRecordData] = useState(null);

  const configuration = {
    method: "get",
    url: `http://localhost:5100/get-artefact/${_id}`,
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  };


  // Get Function to retirev the artefact data
  async function getRecord() {
    const response = await axios(configuration);

    if (!response) {
    } else {
      return response;
    }
  }

  useEffect(function () {
    getRecord()
      .then((response) => {
        setRecordData(response.data.result);
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
    <>
      <Navbar />
      <div className='full-view'>
        <div className="artefact-image">
          <img
            src={recordImg}
            alt={recordName}
          />
          <div
            className='inner-shadow'
            onClick={() => setToggler(!toggler)}
          >
            <h1 className="artefact-name">{recordName}</h1>
            <div className='location'>{recordLocation}</div>
          </div>
        </div>
        <div className="data-container">
          <div className="quick-information">
            <PersonAssociated data={recordPerson} />
            <div className='separator'>|</div>
            <Tag  data={recordCategory}/>
          </div>
          <div className='detailed'>
            <RecordDescription data={recordDescription} />
            <div></div>
            <Memories data={recordMemories} />
          </div>
        </div>
      </div>
      <FsLightbox toggler={toggler} sources={[recordImg]} />
    </>
  );
}

function PersonAssociated ( { data } ) {
    return (
        <div className='associated'>With <b>{data}</b></div>
    )
}

function Tag ( { data } ) {
    return (
        <div className='category'><b>{data}</b></div>
    )
}

function RecordDescription ( { data } ) {
    let dataClass = 'detailed--data';
    if (data === undefined || data === '') {
        data = 'No description added, but always worth remembering';
        dataClass += ' undefined';
    }
    return (
        <>
        <div className='data-field'>
          <h2 className='detailed--header'>Description</h2>
          <div className={dataClass}>{data}</div>
        </div>
        </>
    )
}

function Memories ( { data } ) {
    let dataClass = 'detailed--data';
    if (data === undefined || data === '') {
        data = 'No memories recorded, but always worth sharing';
        dataClass += ' undefined';
    }
    return (
        <>
        <div className='data-field'>
          <h2 className='detailed--header'>Memories</h2>
          <div className={dataClass}>{data}</div>
        </div>
        </>
    )
}

export default FullView;
