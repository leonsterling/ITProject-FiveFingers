import React, { useState} from 'react';
import TopNav from './TopNav';
import MobileNav from './MobileNav';
import ViewToggle from './viewToggle';
import PictureMode from './PictureMode';
import ListView from '../ListView/ListView';
import Cookies from "universal-cookie";

// CSS imports
import "./Dashboard.css";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");


const Dashboard = () => { 
  
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
 
  const openMobileNav = () => {
    setMobileNavOpen(true);
  }

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  }

  const [isToggled, setIsToggled] = useState(false);

  return (
    <>
    <div className="container">
      <TopNav mobileNavOpen={mobileNavOpen} openMobileNav={openMobileNav} />
      <MobileNav mobileNavOpen={mobileNavOpen} closeMobileNav={closeMobileNav} />
    </div>
    <div className="dashboard-header">
        <h2>My Artefacts</h2>
        <ViewToggle className="viewToggle" isToggled={isToggled} onToggle={()=>setIsToggled(!isToggled)}/>
    </div>
    {isToggled? <ListView/> : <PictureMode/>}
    </>
  );


};



export default Dashboard;