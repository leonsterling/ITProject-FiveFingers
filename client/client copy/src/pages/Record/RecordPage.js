import React, { useState, useEffect, Component } from "react";
import SideNav from '../../components/SideNav';
import DropFileInput from "./dropFiles/drop-file-input/DropFileInput.jsx";
import "../Record/dropFiles/DropFiles.css";
//import axios from 'axios';

// CSS imports
import "./RecordPage.css";

const RecordForm = () => {

  const onFileChange = (files) => {
    console.log(files);
    setRecord(record.artefactFiles = files);
  };

  const initialState = {
		artefactName: "",
		artefactDate: "",
		location: "",
		description: "",
    artefactFiles : [],
	};

  const [record, setRecord] = useState(initialState);


  function handleSubmit(e) {
    console.log(record)
		e.preventDefault();
	}

  function handleChange(event) {
		setRecord({ ...record, [event.target.name]: event.target.value });
    console.log(record);
	}

  const [sideNavOpen, setSideNavOpen] = useState(false);

  const openSideNav = () => {
    setSideNavOpen(true);
  }

  const closeSideNav = () => {
    setSideNavOpen(false);
  }

  return (
    <div class="container1">
      <SideNav sideNavOpen={sideNavOpen} closeSideNav={closeSideNav} />
      
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Create Artefact</h1>
        <div class="container2">
          <div class="container3" id="input">
            <label for = "artefactName">Artefact Name *</label>
            <input 
              name = "artefactName"
              id= "artefactName"
              type = "text" 
              onChange={handleChange}
              required
             />
            <label for = "artefacDate">Date of origin</label>
            <input 
            name = "artefactDate"
            id = 'artefactDate'
            type = "date"
            tabIndex={"2"} 
            onChange={handleChange}
             />
            <label for = "location">Location</label>
            <input
              name = "location"
              id= "location"
              type="text"
              tabIndex={"2"}
              onChange={handleChange}
            />
            <label for = "description">Description</label>
            <textarea
              name = "description"
              id = "description"
              type="text"
              rows="5"
              tabIndex={"2"}
              onChange={handleChange}
              //className="form-control" 
            />
            <label for = "tags">Tags</label>
            <input
              name = "tags"
              id= "tags"
              type="text" //for now
              tabIndex={"2"}
              onChange={handleChange}
            />
          </div>
          <div class="container3" id="upload">
            <label>Upload image *</label>
            <div className="box">
              <DropFileInput onFileChange={(files) => onFileChange(files)} />
            </div>
          </div>
        </div>
        <div class="container2" id="button">
          <button className="button" type="submit">Submit</button>
        </div>
      </form>
    </div>      
  );
};

export default RecordForm;
// notes:
// insert clear button maybe?
