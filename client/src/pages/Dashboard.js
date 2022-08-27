import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import TopNav from './TopNav';
import SideNav from './SideNav';

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
      <h1>this is the dashboard, three different components will be here</h1>
      <SideNav sideNavOpen={sideNavOpen} closeSideNav={closeSideNav} />
    </div>
  );


};

/*
function PictureDashboard() {
    return (
      <main>
          <div className="main-container">
            <div className="main-title">
            
            </div>

            <div className="main-cards">

              <div className="card">
                <img></img>
                <p>Title of Artefact</p>
              </div>

              <div className="card">
                <h2>Title of Artefact</h2>
              </div>

              <div className="card">
                <h2>Title of Artefact</h2>
              </div>

              <div className="card">
                <h2>Title of Artefact</h2>
              </div>

              <div className="card">
                <h2>Title of Artefact</h2>
              </div>

              <div className="card">
                <h2>Title of Artefact</h2>
              </div>

              <div className="card">
                <h2>Title of Artefact</h2>
              </div>
            </div>



          </div>
      </main>
    )
}
*/

export default Dashboard;