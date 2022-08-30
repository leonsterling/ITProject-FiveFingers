import "./SearchBar.css"
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

const SearchBar = () => {
    return (
        <body>
        <div className="search-bar">
            <form className="search-form" action="/" method="GET">
                <input className="search-field" type="search" placeholder="search"/>
                <div className="search-button">
                    <Icon className="search-icon" icon="bi:search" />
                </div>
            </form>
        </div>
        </body>
    );
};

export default SearchBar;