/**
 * @fileoverview The List view shows the artefacts
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 * - Axios for getting information from the serverside
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React, { useState } from "react";

// Style-based imports
import "./ListView.css";

// Import Skewer 
import Skewer from "../../../components/Skewer"

/**
 * The List View component. Handles data based on whether the top-level
 * component chooses to search or display the default artefacts
 * @return {React.Component}
 */
function ListView ({ userData, setUserData, currPageNum, setCurrPageNum, setNumPages }) {
  const /** string */ [hoverID,   setHoverID] = useState("");
  const /** boolean */ [hover,   setHover] = useState(false);
                                 
  function hoverFunction(id) {
    // Change the state of the visibility to true
    if (hoverID.length !== 0) {
      setHover({
        [hoverID]: !hover[hoverID],
      });
    }
    setHover({
      [id]: !hover[id],
    });
    setHoverID(id);
  }

  let /** ?Array<React.Compoent> */ row = null;
  if (userData) {
    row = userData.map(
      ({ _id, artefactName, description, associated, category }) => (
        <tr 
        className='table-body' 
        key={_id}
        onMouseEnter={() => hoverFunction(_id)}
        onMouseLeave={() => hoverFunction(_id)}
        >
          <td className='table-cell' id="name-cell">
            {(artefactName) ? artefactName : "No name"}
          </td>
          <td className='table-cell dark-grey' id="desc-cell">
            {(description) ? description.substring(0, 60): <i>No description given</i>}
          </td>
          <td className='table-cell dark-grey' id="category-cell">
            {(category.category_name) ? category.category_name : <i>No category chosen</i> }
          </td>
          <td className='table-cell dark-grey' id="person-cell">
            {(associated.person) ? associated.person : <i>No person associated</i>}
          </td>
          <td 
          className='table-cell' 
          id="kebab-menu"
          >
            <div className="skewer-cell">
              <Skewer
                _id={_id}
                setUserData={setUserData}
                currPageNum={currPageNum}
                setCurrPageNum={setCurrPageNum}
                setNumPages={setNumPages}
                mode={"dashboard"}
              />
            </div>
          </td>
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
