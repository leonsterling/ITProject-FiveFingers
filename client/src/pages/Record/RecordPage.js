// Import the necessary libraries
import React, { useState, useEffect, Component } from "react";
import DropFileInput from "./dropFiles/drop-file-input/DropFileInput.jsx";
import TextInsertField from './TextInsertField.js';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FileBase from 'react-file-base64';
import axios from "axios";
import Cookies from "universal-cookie";

// CSS imports
import "./RecordPage.css";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const feedbackMessages = {
    initial: '',
    invalid: 'The artefact must have a valid name and a picture uploaded',
    valid:   'Adding your artefact'
}

// Record form to add a new Artefact
const RecordForm = () => {
  // Initialize the navigate function
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(feedbackMessages.initial);

  // Change the artefactFiles list if a new file is added or removed
  const onFileChange = (files) => {
    console.log(files);
    setRecord((record.artefactFiles = files));
  };

  // The JSON object that is being constantly updated and sent
  const initialState = {
    artefactName: "",
    artefactDate: "",
    location: "",
    description: "",
    //tags: "",
    artefactImg: "",
  };

  // React hook to change the state of record
  const [record, setRecord] = useState(initialState);

  // NOT DONE YET
  function handleSubmit(e) {

    // Prevent the user from refreshing the page when they input "enter"
    e.preventDefault();

    if (!isValidInput(record)) {
        setFeedback(feedbackMessages.invalid);
        return;
    }

    setFeedback(feedbackMessages.valid);
    async function recordArtefact (e) {
      // set configurations
      const configuration = {
        method: "post",
        url: "http://localhost:5100/add-artefact",
        data: {
          record
        },
        headers: {
          Authorization: `Bearer ${token}`, // authorized route with jwt token
        },
      };


      // make the API call
      axios(configuration)
      .then((result) => {
        window.location.href = "/dashboard"
      })
      .catch((error) => {
        error = new Error();
        console.log(error)
      });
    }

    recordArtefact()
  }

  // Change the state of the record object based on user input
  function handleChange(event) {
    setRecord({ ...record, [event.target.name]: event.target.value });
    console.log(record);
  }

  const [sideNavOpen, setSideNavOpen] = useState(false);

  // Return an HTML of the Record Page
  return (
    <>
      <div className="record-page">
        {/* Render the side nav*/}

        {/* The form that the user to send to database */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Add Artefact</h1>
          <div className="data-entry-fields">
            <TextInsertField handleChange={handleChange}/>
            {/* Upload Images */}
            <div className='data-entry-fields--image-upload'>
              <label>Upload Image</label>
              <FileBase type="file" name="artefactImg" multiple={false} onDone={({ base64 }) => setRecord({ ...record, artefactImg: base64 })} />
              <div><img src={record.artefactImg} alt="No Images have been Uploaded Yet" /></div>
            </div>
          </div>

          {/* This is the cancel button it just redirects to dashboard */}
          <p>{feedback}</p>
          <div className="response-button" id="button">
            <Link to={`/dashboard`}>
              <button className="response-button__cancel" type="submit">
                Cancel
              </button>
            </Link>
            <button className="response-button__submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

function isValidInput(data) {
    return (data.artefactName !== '' && data.artefactImg !== '');
}


export default RecordForm;
