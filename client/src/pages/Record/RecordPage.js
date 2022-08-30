// Import the necessary libraries
import React, { useState, useEffect, Component } from "react";
import SideNav from "../../components/SideNav";
import DropFileInput from "./dropFiles/drop-file-input/DropFileInput.jsx";
import "../Record/dropFiles/DropFiles.css";
import { Link } from "react-router-dom";

// CSS imports
import "./RecordPage.css";

// Record form to add a new Artefact
const RecordForm = () => {
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
    tags: "",
    artefactFiles: [],
  };

  // React hook to change the state of record
  const [record, setRecord] = useState(initialState);

  // NOT DONE YET
  function handleSubmit(e) {
    console.log(record);

    // Prevent the user from refreshing the page when they input "enter"
    e.preventDefault();

  }

  // Change the state of the record object based on user input
  function handleChange(event) {
    setRecord({ ...record, [event.target.name]: event.target.value });
    console.log(record);
  }

  const [sideNavOpen, setSideNavOpen] = useState(false);

  const openSideNav = () => {
    setSideNavOpen(true);
  };

  const closeSideNav = () => {
    setSideNavOpen(false);
  };

  // Return an HTML of the Record Page
  return (
    <>
      <div className="container1">
        
         {/* Render the side nav*/}
        <SideNav sideNavOpen={sideNavOpen} closeSideNav={closeSideNav} />

         {/* The form that the user to send to database */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Create Artefact</h1>
          <div className="container2">
            <div className="container3" id="input">
              <label for="artefactName">Artefact Name *</label>
              <input
                name="artefactName"
                id="artefactName"
                type="text"
                onChange={handleChange}
                required
              />
              <label for="artefacDate">Date of origin</label>
              <input
                name="artefactDate"
                id="artefactDate"
                type="date"
                tabIndex={"2"}
                onChange={handleChange}
              />
              <label for="location">Location</label>
              <input
                name="location"
                id="location"
                type="text"
                tabIndex={"2"}
                onChange={handleChange}
              />
              <label for="description">Description</label>
              <textarea
                name="description"
                id="description"
                type="text"
                rows="5"
                tabIndex={"2"}
                onChange={handleChange}
                //className="form-control"
              />
              <label for="tags">Tags</label>
              <input
                name="tags"
                id="tags"
                type="text" //for now
                tabIndex={"2"}
                onChange={handleChange}
              />
            </div>
            <div className="container3" id="upload">
              <label>Upload image *</label>
              <div className="box">
                <DropFileInput onFileChange={(files) => onFileChange(files)} />
              </div>
            </div>
          </div>
          <div class="container2" id="button">

          <Link to={`/dashboard`}>
          <button className="button" type="submit">
              Submit
            </button>     
           </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RecordForm;
