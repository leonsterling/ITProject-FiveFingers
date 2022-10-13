import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FontIcon } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@iconify/react';
import "./Skewer.scss";

const SkewerButton = ({ onClick }) => {

    return (
        <button className='skewer-button' onClick={onClick}>
            <Icon icon="bi:three-dots"/>
        </button>
        
    );
};

export default SkewerButton;