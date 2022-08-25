import React, { useState, useEffect, Component } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useStyles from "./styles";
import DropFileInput from "/Users/nicholaswidjaja/Desktop/ITProject-FiveFingers/client/src/pages/Record/dropFiles/drop-file-input/DropFileInput.jsx";
import "/Users/nicholaswidjaja/Desktop/ITProject-FiveFingers/client/src/pages/Record/dropFiles/DropFiles.css";


const RecordForm = () => {

  const classes = useStyles();
  const onFileChange = (files) => {
    console.log(files);
  };

  return (
    <>
      <form>
        <Typography>Create Artefact</Typography>
        <Grid container spacing={10}>
          <Grid item xs={3.7}>
            <label>
              <p>Artefact Name:</p>
              <input type="text" id="emailAddress" />
            </label>
            <label>
              <p>Date of origin</p>
              <input type="date" tabIndex={"2"} id="dateofOrigin" />
            </label>
            <label>
              <p>Location</p>
              <input
                type="text"
                tabIndex={"2"}
                //className="form-control"
                id="artefactLocation"
              />
            </label>
            <label>
              <p>Description</p>
              <textarea
                type="text"
                tabIndex={"2"}
                //className="form-control"
                id="artefactDescription"
              />
            </label>
          </Grid>
          <Grid item xs={8.3}>
            <div className="box">
              <h2 className="header">React drop files input</h2>
              <DropFileInput onFileChange={(files) => onFileChange(files)} />
            </div>
          </Grid>
        </Grid>
         <button className="button" type="submit"> Submit</button>
         <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          className={classes.submit}
        >
          Submit
        </Button>

      </form>
    </>
  );
};

export default RecordForm;
// notes:
// insert clear button maybe?
