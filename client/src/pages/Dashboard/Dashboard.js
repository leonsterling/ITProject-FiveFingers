import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import TopNav from './TopNav';
import SideNav from './SideNav';
import PictureMode from './PictureMode';

// CSS imports
import "./Dashboard.css";

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