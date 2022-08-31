import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import SearchBar from './SearchBar';

// CSS imports
import "./TopNav.css";
import logo from "../assets/LOGO-BLACK.png";
// <Link to="/add-artefact" className="add-artefact"></Link>
// <img width="30px" src={logo} alt="logo"/>
/* List Mode button should be in the dashboard area
<div className="list-icon">
<Icon className="list-icon" icon="charm:layout-list" />
</div>
*/

const TopNav = ({sideNavOpen, openSideNav}) => {
    return (
        <nav className="topnav">
            <div className="nav-icon" onClick={() => openSideNav()}>
                <Icon className="nav-icon-button" icon="charm:menu-hamburger"/>
            </div>
            <div className="topnav-left">
            </div>
            <div className="topnav-right">

                <div className="search-bar">
                    <SearchBar />
                </div>

                <Link className="add-artefact-button" to={`/addartefact`}>
                    <button className='add-artefact'>
                        Add Artefact
                        <Icon className="add-icon" icon="akar-icons:plus" />
                    </button>
                </Link>

            </div>
        </nav>
    );
};

export default TopNav;