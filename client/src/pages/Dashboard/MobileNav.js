import "./MobileNav.css";
//import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const MobileNav = ({ mobileNavOpen, closeMobileNav}) => {
    
    // logout function
    const logout = () => {
        // cookie removed
        cookies.remove("TOKEN", { path: "/" });
        // user redirected to login page
        window.location.href = "/";
    };
    
    
    return (
        <div className={mobileNavOpen ? "mobilenav-responsive" : ""} id="mobilenav">
            <div className="mobilenav-exit">
                
            </div>

            <div className="mobilenav-content">
                <Link className="mobilenav-link" to={`/dashboard`}>
                    <a>Dashboard</a>
                </Link>
                <Link className="mobilenav-link" to={`/add-artefact`}>
                    <a>Add Artefact</a>
                </Link>
                <div className="mobilenav-link">
                
                    <a onClick={() => logout()}>Sign Out</a>
                </div>
            </div>
            
        </div>
    );
};

/*

<Icon 
                    icon="akar-icons:cross"
                    id="exitNavIcon" 
                    onClick={() => closeMobileNav()}
                />

                <i><Icon icon="icon-park-outline:logout" /></i>
*/

export default MobileNav;
