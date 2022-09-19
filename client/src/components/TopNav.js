import React, { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import Cookies from "universal-cookie";

// CSS imports
import "./TopNav.css";
import logo from "../pages/assets/LS-Logo.png";

// obtain token from cookie
const cookies = new Cookies();

const TopNav = ({mobileNavOpen, openMobileNav}) => {
    
    // logout function
    const logout = () => {
        // cookie removed
        cookies.remove("TOKEN", { path: "/" });
        // user redirected to login page
        window.location.href = "/";
    };

    return (
        <nav className="topnav">
            <div className="topnav-left" data-testid="nav-left">
                <img src={logo} alt="Sterling logo"/>
                Sterling Family Artefacts
            </div>
            <div className="topnav-right" data-testid="nav-right">

                <Link className="topnav-button" to={`/dashboard`}>
                    <button className='dashboard' data-testid="dashboard-btn">
                        Dashboard
                    </button>
                </Link>

                <Link className="topnav-button" to={`/add-artefact`}>
                    <button className='add-artefact' data-testid="add-btn">
                        Add Artefact
                    </button>
                </Link>
                <div className="topnav-button" onClick={() => logout()}>
                    <button className='logout' data-testid="logout-btn">
                        <Icon className='logout-icon-button' icon="icon-park-outline:logout" />
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="nav-icon" onClick={() => openMobileNav()} data-testid="hamburger-btn">
                <Icon className="nav-icon-button" icon="charm:menu-hamburger"/>
            </div>
        </nav>
    );
};

export default TopNav;