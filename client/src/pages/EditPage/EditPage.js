// Import the necessary libraries
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextUpdateField from "./TextUpdateField";
import axios from "axios";
import Cookies from "universal-cookie";
import Navbar from "../../components/Navbar";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const feedbackMessages = {
  initial: "",
  invalid: "The artefact must have a valid name and a picture uploaded",
  valid: "Updating your artefact",
};

const EditPage = () => {
  const [feedback, setFeedback] = useState(feedbackMessages.initial);

  // id constant to send request based on the specific artefact id
  const { _id } = useParams();
  //console.log({ _id });

  const initialState = {
    artefactName: "",
    artefactDate: "",
    location: "",
    description: "",
    artefactImg: "",
    memories: "",
    category: "",
    associated: "",
  };

  async function updateArtefact(e) {
    // set configurations
    const configuration = {
      method: "patch",
      url: `http://localhost:5100/edit-artefact/${_id}`,
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
  // NOT DONE YET
  function handleSubmit(e) {
    // Prevent the user from refreshing the page when they input "enter"
    e.preventDefault();
    console.log("here");
    console.log(record);
    let newRecord = JSON.parse(JSON.stringify(record));
    newRecord.associated = record.associated.person;
    newRecord.category = record.category.category_name;
    console.log("New Record");
    console.log(newRecord);
    if (!isValidInput(newRecord)) {
      setFeedback(feedbackMessages.invalid);
      return;
    }
    updateArtefact();
    setFeedback(feedbackMessages.valid);
  }

  // React hook to change the state of record
  const [record, setRecord] = useState(initialState);

  // Hook to get the data
  const configuration = {
    method: "get",
    url: `http://localhost:5100/get-artefact/${_id}`,
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  };
  let currCat;
  let currPer;

  function mapResults(e){
    const newState = {
      artefactName: e.artefactName,
      location: e.location,
      description: e.description,
      artefactImg: e.artefactImg,
      memories: e.memories,
      category: e.category.category_name,
      associated: e.associated.person,
    };
    return newState;
  }
  useEffect(function () {
    async function updatePage() {
      try {
        const response = await axios(configuration);
        //setRecord(response.data.result);
        let mapped = mapResults(response.data.result)
        setRecord(mapped);
        //record.category = record.category.category_name;
        //record.associated = record.associated.person;
        currCat = record.category.category_name;
        currPer = record.associated.person;
      } catch (error) {
        console.log(error);
      }
    }
    updatePage();


    console.log(record);

  }, []);

  // Change the state of the record object based on user input
  function handleChange(event) {
    setRecord({ ...record, [event.target.name]: event.target.value });
    console.log(record);
  }

  return (
    <>
      <Navbar />

      <div className="record-page">
        {/* The form that the user to send to database */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Edit Artefact</h2>
          <div className="data-entry-fields">
            {/* TEXT DATA*/}
            <TextUpdateField
              handleChange={handleChange}
              initialData={record}
              cat={currCat}
              per={currPer}
            />

            {/* Image Display */}
            <div className="data-entry-fields--image-upload">
              <label className="data-entry-fields--image-upload--description">
                Artefact image
              </label>
              <div className="data-entry-fields--image-upload--upload-complete">
                <img
                  src={record.artefactImg.imgURL}
                  alt="No Images have been Uploaded Yet"
                />
              </div>
            </div>
          </div>

          {/* This is the cancel button it just redirects to dashboard */}
          {/*<p>{feedback}</p>*/}

          <div className="response-button" id="button">
            {/*
            <Link to={`/dashboard`}>
              <button className="response-button__cancel" type="submit">
                Cancel
              </button>
            </Link>
          */}
            <button className="response-button__submit" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );

  function isValidInput(data) {
    return data.artefactName !== "" && data.artefactImg !== "";
  }
};

export default EditPage;
