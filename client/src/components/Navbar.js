/**
 * @fileoverview The global navigation bar, helping the user navigate
 *               throughout the whole webpage
 * Uses:
 * - React for rendering HTML
 */

// Imports of packages
import React, { useState } from "react";

// Imports of local components
import TopNav from "./TopNav";
import MobileNav from "./MobileNav";

/**
 * The Navigation bar component. The component that renders the global links
 * to:
 * - The homepage
 * - The button to add an artefact
 * - The button to log out
 * While it is global it only shows when the user is signed in
 * @return {React.Component}
 */
function Navbar() {
  const /** boolean */ [mobileNavOpen, setMobileNavOpen] = useState(false);

  const /** callback */ openMobileNav = () => {
      setMobileNavOpen(true);
    };

  const /** callback */ closeMobileNav = () => {
      setMobileNavOpen(false);
    };

  return (
    <>
      <div className="nav-bar">
        <TopNav mobileNavOpen={mobileNavOpen} openMobileNav={openMobileNav} />
        <MobileNav
          mobileNavOpen={mobileNavOpen}
          closeMobileNav={closeMobileNav}
        />
      </div>
      {/**
       * Spacer required as the .nav-bar html component
       * contains position: fixed
       **/}
      <div className="spacer"></div>
    </>
  );
}

export default Navbar;
