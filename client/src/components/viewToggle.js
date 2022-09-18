import React from 'react';
import { Icon } from '@iconify/react';
import "./viewToggle.css";

const viewToggle = ({isToggled, onToggle}) => {
    return (
        <label className="viewToggle" data-testid="viewToggle">
            <input type="checkbox" data-testid="check-viewToggle" checked = {isToggled} onChange = {onToggle}/>
            <span className="slider" data-testid="slider-viewToggle">
                <Icon icon="clarity:grid-view-line" className="view-icon" data-testid="gallery-viewToggle"/>
                <Icon icon="system-uicons:menu-hamburger" className="view-icon" data-testid="list-viewToggle"/>
            </span>
        </label>
    );
};

export default viewToggle;
