import React, { useState } from 'react';
import { Link } from "react-router-dom";



const SkewerDropDown = (_id) => {

    return (
        <div className='shadow'>
            <div className='text-left'>
                <div>
                    <Link to={`edit-artefact/${_id}`} className="link-line">
                        Edit
                    </Link>
                </div>
                <div>
                    <Link to={`delete/${_id}`} className="link-line">
                        Delete
                    </Link>
                </div>
                <div>
                    <Link to={`full-view/${_id}`} className="link-line">
                        View Full Details
                    </Link>
                </div>
            </div>
        </div>


    )
};

export default SkewerDropDown;