import "./SideNav.css";
import logo from "../pages/Record/dropFiles/assets/LOGO-BLACK.png";
import { Icon } from '@iconify/react';
import React from 'react';
const SideNav = ({ sideNavOpen, closeSideNav}) => {
    return (
        <div className={sideNavOpen ? "sidenav-responsive" : ""} id="sidenav">
            <div className="sidenav-title">
                <div className="sidenav-img">
                    <img src={logo} alt="Sterling logo"/>
                </div>
                <i>
                <Icon 
                    icon="akar-icons:cross"
                    id="sidenavIcon" 
                    onClick={() => closeSideNav()}
                />
                </i>
            </div>


            <div className="sidenav-menu">
                <div className="sidenav-link active-menu-link">
                    <i><Icon icon="bxs:dashboard"/></i>
                    <a href="#">Dashboard</a>
                </div>
                <div className="sidenav-link">
                    <i><Icon icon="ion:albums" /></i>
                    <a href="#">Albums</a>
                </div>
                <div className="sidenav-link">
                    <i><Icon icon="bxs:add-to-queue" /></i>
                    <a href="#">Add Artefact</a>
                </div>
                <div className="sidenav-logout">
                    <i><Icon icon="icon-park-outline:logout" /></i>
                    <a href="#">Sign Out</a>
                </div>
            </div>
        </div>
    );
};

export default SideNav;
