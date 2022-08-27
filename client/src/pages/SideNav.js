import "./SideNav.css";
import logo from "../assets/LOGO-BLACK.png";
import { Icon } from '@iconify/react';

const SideNav = ({ sideNavOpen, closeSideNav}) => {
    return (
        <div className={sideNavOpen ? "sidenav-responsive" : ""} id="sidenav">
            <div className="sidenav-title">
                <div className="sidenav-img">
                    <img src={logo} alt="Sterling logo"/>
                    <h1>Sterling's Family Artefact</h1>
                </div>
                <Icon 
                    icon="akar-icons:cross"
                    id="sidenavIcon" 
                    onClick={() => closeSideNav()}
                />
            </div>

            <div className="sidenav-menu">
                <div className="sidebar-link active-menu-link">
                    <Icon icon="bxs:dashboard"/>
                    <a href="#">Dashboard</a>
                </div>
                <h2>MNG</h2>
            </div>


        </div>









    );
};

export default SideNav;