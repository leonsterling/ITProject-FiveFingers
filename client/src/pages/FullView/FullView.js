/**
 * @fileoverview The full-view page, where the user sees a single artefact
 *               with all its recorded details
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 * - Axios for getting information from the serverside
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import FsLightbox from "fslightbox-react";
import axios from "axios";
import { Icon } from '@iconify/react';

// Imports of local components
import Navbar from "../../components/Navbar.js";
import Skewer from "../../components/Skewer";

// Style-based imports
import "./FullView.scss";

// Import Authentication and Cookies
const cookies = new Cookies();
const token = cookies.get("TOKEN");

/**
 * The component that gets all the data of a single artefact and then renders
 * it for the user to view
 * @return {React.Component}
 */
function FullView() {
  // if toggler is updated when lightbox is closed it will open it
  // if toggler is updated when lightbox is opened it will close it
  const /** boolean */ [toggler, setToggler] = useState(false);

  // id constant to send request based on the specific artefact id
  const /** string */ { _id } = useParams();

  // State to update the recordData of the artefact
  /** ?{{
   *     _id: string,
   *     artefactName: string,
   *     description: string,
   *     memories: string,
   *     location: string,
   *     artefactImg: {{
   *        imgURL: string,
   *        publicID: string
   *     }},
   *     associated: {{
   *        _id: string,
   *        person: string
   *     }},
   *     category: {{
   *        _id: string,
   *        category_name: string
   *     }}
   *  }} */
  const [recordData, setRecordData] = useState(null);

  /** ?{{
   *     method: string,
   *     url: string,
   *     headers: {{
   *        Authorization: string
   *     }}
   *  }} */
  const configuration = {
    method: "get",
    url: `http://localhost:5100/get-artefact/${_id}`,
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  };

  /**
   * Get Function to retrieve the artefact data
   */
  async function getRecord() {
    const /** Promise */ response = await axios(configuration);

    if (!response) {
    } else {
      return response;
    }
  }

  /**
   * After rendering the basic component (without data), it calls the
   * `getRecord` function to fetch and set the data accordingly
   */
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
    console.log(recordData);
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
      <div className="full-view">
        <div className="artefact-image">
          <img src={recordImg} alt={recordName} />
          <div className="inner-shadow">
            <h1 className="artefact-name">{recordName}</h1>
            <div className="location">{recordLocation}</div>
            <div className="light-box-toggle" onClick={() => setToggler(!toggler)}>
              <Icon icon="icon-park-outline:full-screen-play" color="white" />
            </div>
            <div className="skewer-full">
              <Skewer _id={_id} />
            </div>
          </div>
        </div>
        <div className="data-container">
          <div className="quick-information">
            <PersonAssociated data={recordPerson} />
            <div className="separator">|</div>
            <Tag data={recordCategory} />
          </div>
          <div className="detailed">
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

/**
 * The component that shows who this artefact is associated with
 * @return {React.Component}
 */
function PersonAssociated({ data }) {
  return (
    <div className="associated">
      With <b>{data}</b>
    </div>
  );
}

/**
 * The component that shows the categories that this artefact is associated
 * with
 * @return {React.Component}
 */
function Tag({ data }) {
  return (
    <div className="category">
      <b>{data}</b>
    </div>
  );
}

function RecordDescription({ data }) {
  let dataClass = "detailed--data";
  if (data === undefined || data === "") {
    data = "No description added, but always worth remembering";
    dataClass += " undefined";
  }
  return (
    <>
      <div className="data-field">
        <h2 className="detailed--header">Description</h2>
        <div className={dataClass}>{data}</div>
      </div>
    </>
  );
}

/**
 * The component that shows the memories this artefact contains
 * @return {React.Component}
 */
function Memories({ data }) {
  let dataClass = "detailed--data";
  if (data === undefined || data === "") {
    data = "No memories recorded, but always worth sharing";
    dataClass += " undefined";
  }
  return (
    <>
      <div className="data-field">
        <h2 className="detailed--header">Memories</h2>
        <div className={dataClass}>{data}</div>
      </div>
    </>
  );
}

export default FullView;
