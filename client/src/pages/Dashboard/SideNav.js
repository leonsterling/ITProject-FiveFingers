import "./SideNav.css";
import logo from "../assets/LOGO-BLACK.png";
import { Icon } from '@iconify/react';
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const SideNav = ({ sideNavOpen, closeSideNav}) => {
  // logout function
  const logout = () => {
    // cookie removed
    cookies.remove("TOKEN", { path: "/" });
    // user redirected to login page
    window.location.href = "/";
  };

  return (
      <div className={sideNavOpen ? "sidenav-responsive" : ""} id="sidenav">
          <div className="sidenav-title">
              <div className="sidenav-img">
                  <img src={logo} alt="Sterling logo"/>
              </div>
              
              <Icon 
                  icon="akar-icons:cross"
                  id="sidenavIcon" 
                  onClick={() => closeSideNav()}
              />
              
          </div>

          <div className="sidenav-menu">
              <div className="sidenav-link active-menu-link">
                  <i><Icon icon="bxs:dashboard"/></i>
                  <a href="#">Dashboard</a>
              </div>
              <div className="sidenav-link">
                  <i><Icon icon="ion:albums" /></i>
                  <a href="#">Albums</a>
              </div>
              <div className="sidenav-link">
                  <i><Icon icon="bxs:add-to-queue" /></i>
                  <a href="#">Add Artefact</a>
              </div>
              <div className="sidenav-logout">
                  <i><Icon icon="icon-park-outline:logout" /></i>
                  <a href="#" onClick={() => logout()}>Sign Out</a>
              </div>
          </div>
      </div>
  );
};

export default SideNav;
