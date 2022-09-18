import React, { useEffect, useState} from 'react';
import { Icon } from '@iconify/react';

// CSS imports
import "../pages/Dashboard/TopNav.css";
import logo from "../pages/assets/LS-Logo.png";

const TopNav = ({mobileNavOpen, openMobileNav}) => {
    
    // logout function
    const logout = () => {
        console.log('Logged Out');
    };

    return (
        <nav className="topnav">
            <div className="topnav-left">
                <img src={logo} alt="Sterling logo"/>
                Sterling Family Artefacts
            </div>
            <div className="topnav-right">

                <a className="topnav-button" to={`/dashboard`}>
                    <button className='dashboard'>
                        Dashboard
                    </button>
                </a>

                <a className="topnav-button" to={`/add-artefact`}>
                    <button className='add-artefact'>
                        Add Artefact
                    </button>
                </a>
                <div className="topnav-button" onClick={() => logout()}>
                    <button className='logout'>
                        <Icon className='logout-icon-button' icon="icon-park-outline:logout" />
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="nav-icon" onClick={() => openMobileNav()}>
                <Icon className="nav-icon-button" icon="charm:menu-hamburger"/>
            </div>
        </nav>
    );
};

export default TopNav;