/**
 * @fileoverview The searchbar, used to search for artefacts in the Dashboard
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 * - React Router for handling client-side routes
 */

// Imports of packages
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

// Style-based imports
import "./SearchBar.css";

/**
 * The Searchbar component. Uses a form to grab the search data.
 * @return {React.Component}
 */
function SearchBar() {
  return (
    <body>
      <div className="search-bar">
        <form className="search-form" action="/" method="GET">
          <input
            className="search-field"
            type="search"
            placeholder="search"
          />
          <div className="search-button">
            <Icon className="search-icon" icon="bi:search" />
          </div>
        </form>
      </div>
    </body>
  );
}

export default SearchBar;
