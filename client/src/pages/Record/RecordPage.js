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
import ClipLoader from "react-spinners/ClipLoader";

// Imports of local components
import Navbar from "../../components/Navbar";
import DataEntryFields from "./DataEntryFields/DataEntryFields";
import RecordButtons from "./RecordButtons/RecordButtons";

// Imports of local utils
import { postArtefact } from "../../utils/dataHandler";

// Style-based imports
import "./RecordPage.scss";

// Feedback states for notifying the user with what is going on when they
// choose to add an artefact
/** {{initial: string, invalid: string, valid: string}} */
const feedbackMessages = {
  initial: "",
  invalid: "The artefact must have a valid name and a picture uploaded",
  valid: "",
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

  let [submitActive, setSubmitActive] = useState(true);
  
  // Initialize the loader  
  const /** boolean */ [toggleLoad, setToggleLoad] = useState(false);

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
    artefactName: "",
    artefactDate: "",
    location: "",
    description: "",
    memories: "",
    category: "",
    associated: "",
    artefactImg: "",
    typeImg: "",
    sizeImg: "",
    nameImg: ""
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
    setSubmitActive(false);

    // Prevents the user from submitting any invalid input
    if (!isValidInput(record)) {
      setFeedback(feedbackMessages.invalid);
      setSubmitActive(true);
      return;
    }

    setFeedback(feedbackMessages.valid);
    setToggleLoad(true);

    /**
     * Sends the validated data to the MongoDB database
     * @param e The javascript event
     */
    async function recordArtefact(e) {
      // set configurations
      postArtefact(record)
        .then((result) => {
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.log(error);
        });
    }

    recordArtefact();
  }

  /**
   * Change the state of the record object based on user input
   */
  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    console.log({name, value});
    setRecord({ ...record, [event.target.name]: event.target.value });
  }

  // Return an HTML of the Record Page
  return (
    <>
      <div className="loader" style={{ display : toggleLoad ? 'block' : 'none' }}>
        <ClipLoader className="loading" color="white" size={50}/>
        <h3>Uploading your Artefact</h3>
      </div>
      <Navbar />
      <div className="record-page">
        {/* The form that the user to send to database */}
        <form
          onSubmit={(e) => handleSubmit(e)}
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <h1>Add Artefact</h1>
          <DataEntryFields
            handleChange={handleChange}
            record={record}
            setRecord={setRecord}
          />

          {/* This is the cancel button it just redirects to dashboard */}
          <p className="feedback">{feedback}</p>
          <RecordButtons submitActive={submitActive}/>
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

export default RecordForm;
