/**
 * @fileoverview Implementation of the Add-artefact page
 * Uses:
 * - React for rendering HTML
 * - Axios for getting information from the serverside
 * - FileBase for getting images from the user
 * - React Router for handling client-side routes
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";
import axios from "axios";
import Cookies from "universal-cookie";

// Imports of local components
import TextInsertField from "./TextInsertField.js";
import Navbar from "../Dashboard/Navbar";

// Style-based imports
import "./RecordPage.scss";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

// Feedback states for notifying the user with what is going on when they
// choose to add an artefact
/** {{initial: string, invalid: string, valid: string}} */
const feedbackMessages = {
  initial: "",
  invalid: "The artefact must have a valid name and a picture uploaded",
  valid: "Adding your artefact",
};

/**
 * The component that contains the form data, stores the added information
 * validates it, and then uploads it to the database
 * @return {React.Component}
 */
function RecordForm() {
  // Prevent the 'Enter' key from cancelling the artefact submission
  const /** callback */ checkKeyDown = (e) => {
      if (e.code === "Enter") e.preventDefault();
    };

  // Initialize the navigate function
  const /** string */ [feedback, setFeedback] = useState(
      feedbackMessages.initial
    );

  // The JSON object that is being constantly updated and sent
  /** ?{{
   * artefactName: string,
   * artefactDate: string,
   * location: string,
   * description: string,
   * category: string,
   * associated: string,
   * artefactImg: string,
   *  }} */
  const initialState = {
    artefactName: " ",
    artefactDate: "",
    location: " ",
    description: " ",
    category: " ",
    associated: " ",
    artefactImg: "",
  };

  // React hook to change the state of record
  const [record, setRecord] = useState(initialState);

  /**
   * Obtains the entered data, checks if it is valid, and if it is, uploads it
   * to the database
   */
  function handleSubmit(e) {
    // Prevent the user from refreshing the page when they input "enter"
    e.preventDefault();

    // Prevents the user from submitting any invalid input
    if (!isValidInput(record)) {
      setFeedback(feedbackMessages.invalid);
      return;
    }

    setFeedback(feedbackMessages.valid);
    /**
     * Sends the validated data to the MongoDB database
     * @param e The javascript event
     */
    async function recordArtefact(e) {
      // set configurations
      /** {{
       *     method: string,
       *     url: string,
       *     data: {{
       *        record: object
       *     }}
       *     headers: {{
       *        Authorization: string
       *     }}
       *  }} */
      const configuration = {
        method: "post",
        url: "http://localhost:5100/add-artefact",
        data: {
          record,
        },
        headers: {
          Authorization: `Bearer ${token}`, // authorized route with jwt token
        },
      };

      // make the API call
      axios(configuration)
        .then((result) => {
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          error = new Error();
          console.log(error);
        });
    }

    recordArtefact();
  }

  /**
   * Change the state of the record object based on user input
   */
  function handleChange(event) {
    setRecord({ ...record, [event.target.name]: event.target.value });
  }

  let /** React.Component */ imageDisplay =
      record.artefactImg === "" ? (
        <UploadPending setRecord={setRecord} record={record} />
      ) : (
        <UploadDone setRecord={setRecord} record={record} />
      );
  // Return an HTML of the Record Page
  return (
    <>
      <Navbar />
      <div className="record-page">
        {/* The form that the user to send to database */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <h1>Add Artefact</h1>
          <div className="data-entry-fields">
            <TextInsertField handleChange={handleChange} />
            {/* Upload Images */}
            <div className="data-entry-fields--image-upload">
              {imageDisplay}
            </div>
          </div>

          {/* This is the cancel button it just redirects to dashboard */}
          <p className="feedback">{feedback}</p>
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
}

/**
 * Checks if the entered data has the two required fields
 * @param data The data that is being submitted
  /** ?{{
    * artefactName: string,
    * artefactDate: string,
    * location: string,
    * description: string,
    * category: string,
    * associated: string,
    * artefactImg: string,
    *  }}
  */
function isValidInput(data) {
  return data.artefactName !== "" && data.artefactImg !== "";
}

/**
 * The component initially shown when the page is first entered. Provides
 * a big button to add an image
 * @return {React.Component}
 */
function UploadPending({ setRecord, record }) {
  return (
    <>
      <label className="data-entry-fields--image-upload--description">
        Upload Image
      </label>
      <label className="data-entry-fields--image-upload--upload-button">
        <FileBase
          type="file"
          name="artefactImg"
          multiple={false}
          onDone={({ base64 }) =>
            setRecord({ ...record, artefactImg: base64 })
          }
        />
        Drop your images here, or select <span>click to browse</span>
      </label>
    </>
  );
}

/**
 * The component that comes up after an image has been added after the first
 * time. Showcases the previous image and also provides an option to upload a
 * different image
 * @return {React.Component}
 */
function UploadDone({ record, setRecord }) {
  return (
    <>
      <label className="data-entry-fields--image-upload--description">
        Selected Image
      </label>
      <label>
        <div className="data-entry-fields--image-upload--upload-complete">
          <img src={record.artefactImg} alt="" />
        </div>
      </label>
      <label className="data-entry-fields--image-upload--restart">
        Not satisfied?
        <label>
          Upload again
          <FileBase
            type="file"
            name="artefactImg"
            multiple={false}
            onDone={({ base64 }) =>
              setRecord({ ...record, artefactImg: base64 })
            }
          />
        </label>
      </label>
    </>
  );
}

export default RecordForm;
