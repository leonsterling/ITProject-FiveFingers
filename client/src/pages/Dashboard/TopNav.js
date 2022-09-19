import React from 'react';
import { Link } from "react-router-dom";
//import { Icon } from '@iconify/react';
import Cookies from "universal-cookie";

// CSS imports
import "./TopNav.css";
import logo from "../assets/LS-Logo.png";

// obtain token from cookie
const cookies = new Cookies();

//<Icon className='logout-icon-button' icon="icon-park-outline:logout" />
const TopNav = ({mobileNavOpen, openMobileNav}) => {
    
    // logout function
    const logout = () => {
        // cookie removed
        cookies.remove("TOKEN", { path: "/" });
        // user redirected to login page
        window.location.href = "/";
    };

    let DashboardButton = window.location.href.endsWith('/dashboard') ? (
        <div className="topnav-button">
            <button className='dashboard' onClick={() => window.location.reload()}>
                Dashboard
            </button>
        </div>
        
    ): /* else */ (
        <Link className="topnav-button" to={`/dashboard`}>
            <button className='dashboard'>
                Dashboard
            </button>
        </Link>
    )

    return (
        <nav className="topnav">
            <div className="topnav-left">
                <img src={logo} alt="Sterling logo"/>
                Sterling Family Artefacts
            </div>
            <div className="topnav-right">

                {DashboardButton}

                <Link className="topnav-button" to={`/add-artefact`}>
                    <button className='add-artefact'>
                        Add Artefact
                    </button>
                </Link>
                <div className="topnav-button" onClick={() => logout()}>
                    <button className='logout'>

                        Sign Out
                    </button>
                </div>
            </div>

            <div className="nav-icon" onClick={() => openMobileNav()}>

            </div>
        </nav>
    );
};
//                <Icon className="nav-icon-button" icon="charm:menu-hamburger"/>

export default TopNav;
