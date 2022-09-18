import "./SearchBar.css"
import { Link } from "react-router-dom";
//import { Icon } from '@iconify/react';
import React from 'react';


/*
<Icon className="search-icon" icon="bi:search" />
*/
const SearchBar = () => {
    return (
        <body>
        <div className="search-bar">
            <form className="search-form" action="/" method="GET">
                <input className="search-field" type="search" placeholder="search"/>
                <div className="search-button">
                </div>
            </form>
        </div>
        </body>
    );
};

export default SearchBar;