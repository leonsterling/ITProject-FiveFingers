import "./MobileNav.css";
//import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();

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
                    Dashboard
                </Link>
                <Link className="mobilenav-link" to={`/add-artefact`}>
                    Add Artefact
                </Link>
                <div className="mobilenav-link">
                    <i><Icon icon="icon-park-outline:logout" /></i>
                    <span onClick={() => logout()}>Sign Out</span>
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
