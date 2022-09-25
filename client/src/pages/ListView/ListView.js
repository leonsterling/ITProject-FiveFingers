/**
 * @fileoverview The List view shows the artefacts
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 * - Axios for getting information from the serverside
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

// Style-based imports
import "./ListView.css";

// Import Authentication and Cookies
const cookies = new Cookies();
const token = cookies.get("TOKEN");

/**
 * The List View component. Handles data based on whether the top-level
 * component chooses to search or display the default artefacts
 * @return {React.Component}
 */
function ListView ({ userData, setUserData, handleDashboard }) {
  /**
   * After rendering the basic component (without data), it calls the pre-set
   * callback function to fetch and set the data accordingly
   */
  useEffect(() => {
    handleDashboard()
      .then((res) => {
        setUserData(res.data.artefactRecords);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  let /** ?Array<React.Compoent> */ row = null;
  if (userData) {
    row = userData.map(
      ({ _id, artefactName, description, associated, category }) => (
        <tr className='table-body' key={_id}>
          <td className='table-cell' id="name-cell">{artefactName}</td>
          <td className='table-cell' id="desc-cell">{description.substring(0, 60)}</td>
          <td className='table-cell' id="category-cell">{category.category_name}</td>
          <td className='table-cell' id="person-cell">{associated.person}</td>
          <td className='table-cell' id="kebab-menu"></td>
        </tr>
      )
    );
  }

  return (
    <>
      <main>
        <div className = 'list-view-container'>
          <div className = 'list-table'>
            <table className = 'artefact-list'>
              <thead>
                <tr>
                  <th className="name-table">Artefact Name</th>
                  <th className="desc-table">Description</th>
                  <th className="category-table">Category</th>
                  <th className="person-table">Person Assocciated</th>
                  <th className="kebab-menu"></th>
                </tr>
              </thead>
              <tbody>{row}</tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default ListView;
