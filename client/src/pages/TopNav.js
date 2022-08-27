import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

// CSS imports
import "./TopNav.css";
import logo from "../assets/LOGO-BLACK.png";
// <Link to="/add-artefact" className="add-artefact"></Link>
// <img width="30px" src={logo} alt="logo"/>

const TopNav = ({sideNavOpen, openSideNav}) => {
    return (
        <nav className="topnav">
            <div className="nav-icon" onClick={() => openSideNav()}>
                <Icon icon="charm:menu-hamburger"/>
            </div>
            <div className="topnav-left">
                <a href="#">My Artefacts</a>
            </div>
            <div className="topnav-right">
                <a href="#">List Mode</a>
                <a href="#">Search Bar Here</a>
                <a className="active-link" href="#">Add Artefact</a>
            </div>
            
        </nav>
    );
};

export default TopNav;