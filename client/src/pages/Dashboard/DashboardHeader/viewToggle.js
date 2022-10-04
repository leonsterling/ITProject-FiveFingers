/**
 * @fileoverview The toggle component that switches between the
 *               Picture-mode view (see `PictureMode.js` for more about the
 *               picture-mode view) and the List-mode view (see `ListView.js`
 *               for more about the list view)
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 */

import React from "react";
import { Icon } from "@iconify/react";
import "./viewToggle.css";

function viewToggle({ isToggled, onToggle }) {
  return (
    <label className="viewToggle">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="slider">
        <Icon icon="clarity:grid-view-line" className="view-icon" />
        <Icon icon="system-uicons:menu-hamburger" className="view-icon" />
      </span>
    </label>
  );
}

export default viewToggle;
