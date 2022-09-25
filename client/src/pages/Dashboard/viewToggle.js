import React from 'react';
import { Icon } from '@iconify/react';
import "./viewToggle.css";

const viewToggle = ({isToggled, onToggle}) => {
    return (
        <label className="viewToggle">
            <input type="checkbox" checked = {isToggled} onChange = {onToggle}/>
            <span className="slider">
                <Icon icon="clarity:grid-view-line" className="view-icon"/>
                <Icon icon="system-uicons:menu-hamburger" className="view-icon"/>
            </span>
        </label>
    );
};

export default viewToggle;
