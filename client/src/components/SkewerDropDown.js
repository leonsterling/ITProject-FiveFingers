import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Skewer.scss";


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

    return (
        <div className='skewer-dropdown'>
            <div className='text-left'>
                <div className='skewer-dropdown-item'>
                    <Link to={`/edit-artefact/${_id}`} className="link-line">
                        Edit
                    </Link>
                </div>
                <div className='skewer-dropdown-item'>
                    <Link to={`/delete/${_id}`} className="link-line">
                        Delete
                    </Link>
                </div>
                { FullviewLink }
            </div>
        </div>


    )
};

export default SkewerDropDown;