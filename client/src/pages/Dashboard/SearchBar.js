import "./SearchBar.css"
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <form className="search-form" action="/" method="GET">
                <input className="search-field" type="search" placeholder="search"/>
                <button className="search-button" type="submit">
                    <Icon className="search-icon" icon="bi:search" />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;