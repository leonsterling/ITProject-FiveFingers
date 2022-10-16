import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Skewer.scss";

import { deleteArtefact } from '../utils/dataHandler';

const SkewerDropDown = ({_id}) => {
    let /** React.Component */ FullviewLink = window.location.href.includes(
        `full-view/${_id}`
      ) ? (
        <div 
        className='skewer-dropdown-item'
        onClick={() => window.location.reload()}
        >
            <div className='link-line'>View Full Details</div>
        </div>
      ) : (
        /* else */ <div className='skewer-dropdown-item'>
            <Link to={`/full-view/${_id}`} className="link-line">
                View Full Details
            </Link>
        </div>
      );

    let [confirmVisible, setConfirmVisible] = useState(' invisible');

    return (
        <>
        <div className='skewer-dropdown'>
            <div className='text-left'>
                <div className='skewer-dropdown-item'>
                    <Link to={`/edit-artefact/${_id}`} className="link-line">
                        Edit
                    </Link>
                </div>
                <div
                  className='skewer-dropdown-item'
                  onClick={() => setConfirmVisible(" visible")}
                >
                    <span className="link-line">Delete</span>
                </div>
                { FullviewLink }
            </div>
        </div>
        <div
          className={"confirm-delete" + confirmVisible}
          onClick={() => setConfirmVisible(" invisible")}
        >
          <div className="delete-message-container">
            <div className="message">
              <span>Delete Artefact?</span>
            </div>
            <div className='button-choices'>
              <button
                className="no"
                onClick={() =>
                    setConfirmVisible(" invisible")
                }
                >
                  Cancel
              </button>
              <button className="yes" onClick={() => deleteArtefact(_id)}>
                  Delete
              </button>
            </div>
          </div>
        </div>
        </>
    )
};

export default SkewerDropDown;
