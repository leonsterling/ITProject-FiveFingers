import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import TopNav from './TopNav';
import SideNav from './SideNav';
import PictureMode from './PictureMode';

// CSS imports
import "./Dashboard.css";

const Artefact = (props) => (
<tr>
  <td>{props.artefact.artefact_name}</td>
  <td>
    <Link className="btn btn-link" to={`/edit/${props.artefact._id}`}>Edit</Link> |
    <button className="btn btn-link"
      onClick={() => {
        //props.deleteRecord(props.artefact._id);
      }}
    >
      Delete
    </button>
  </td>
</tr>
/*

const artefactSchema = new mongoose.Schema({
    artefact_name: {type: String},
    artefact_description: {type: String},
    artefact_location: {type: String},
    artefact_date_created: {type: Date, default: new Date()},
    artefact_date_origin: {type: Date},
    artefact_images: [imageSchema],
    artefact_tags: [tagSchema]
 });
*/





)


const Dashboard = () => {

  const [sideNavOpen, setSideNavOpen] = useState(false);

  const openSideNav = () => {
    setSideNavOpen(true);
  }

  const closeSideNav = () => {
    setSideNavOpen(false);
  }

  return (
    <div className="container">
      <TopNav sideNavOpen={sideNavOpen} openSideNav={openSideNav} />
      <PictureMode />
      <SideNav sideNavOpen={sideNavOpen} closeSideNav={closeSideNav} />
    </div>
  );


};



export default Dashboard;