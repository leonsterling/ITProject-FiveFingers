import React, { useState, useEffect, Component } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useStyles from "./styles";
import DropFileInput from "./dropFiles/drop-file-input/DropFileInput.jsx";
import "../Record/dropFiles/DropFiles.css";
//import axios from 'axios';

const RecordForm = () => {
  const classes = useStyles();

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
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography>Create Artefact</Typography>
        <Grid container spacing={10}>
          <Grid item xs={3.7}>
            <label> <p>Artefact Name:</p>
              <input 
                name = "artefactName"
                type="text" 
                onChange={handleChange}
                required
               />
            </label>
            <label>Date of origin:</label>
              <input 
              name = "artefactDate"
              type="date" 
              tabIndex={"2"} 
              onChange={handleChange}
               />
            <label>Location</label>
              <input
                name = "location"
                type="text"
                tabIndex={"2"}
                onChange={handleChange}
              />
            <label>Description</label>
              <textarea
                name = "description"
                type="text"
                tabIndex={"2"}
                onChange={handleChange}
                //className="form-control" 
              />
          </Grid>
          <Grid item xs={8.3}>
            <div className="box">
              <h2 className="header">React drop files input</h2>
              <DropFileInput onFileChange={(files) => onFileChange(files)} />
            </div>
          </Grid>
        </Grid>

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default RecordForm;
// notes:
// insert clear button maybe?
