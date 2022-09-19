import React, { useState} from 'react';
import TopNav from './TopNav';
import MobileNav from './MobileNav';

export default function Navbar () {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
 
  const openMobileNav = () => {
    setMobileNavOpen(true);
  }

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  }

  return (
    <>
    <div className="nav-bar">
      <TopNav mobileNavOpen={mobileNavOpen} openMobileNav={openMobileNav} />
      <MobileNav mobileNavOpen={mobileNavOpen} closeMobileNav={closeMobileNav} />
    </div>
    <div className='spacer'></div>
    </>
  )

}

