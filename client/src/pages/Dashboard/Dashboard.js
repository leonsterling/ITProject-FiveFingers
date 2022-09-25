/**
 * @fileoverview Implementation of the dashboard page
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 * - Axios for getting information from the serverside
 * - Universal Cookie for handling browser cookies and validating logins
 */

// Imports of packages
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import Cookies from "universal-cookie";

// Imports of local components
import ViewToggle from "./viewToggle";
import PictureMode from "./PictureMode";
import ListView from "../ListView/ListView";
import Navbar from "./Navbar";

// Style-based imports
import "./Dashboard.css";

// obtain token from cookie
const cookies = new Cookies();
const /** ?string */ token = cookies.get("TOKEN");

const Dashboard = () => {
  const /** boolean */ [isToggled, setIsToggled] = useState(false);
  let /** ?string */ [userData, setUserData] = useState(null);
  let /** string */ [searchText, setSearchText] = useState("");
  let /** callback */ [getArtefactCallback, setGetArtefactCallback] =
    useState(handleDashboard);

  let /** boolean */ [isSearched, setIsSearched] = useState(false);

  let /** React.Component */ searchContent = (
    <>
      <Icon icon="akar-icons:search" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchText === "") {
            setIsSearched(false);
            handleDashboard();
          } else {
            setIsSearched(true);
            changeCallback(e, setGetArtefactCallback, handleSearch);
          }
        }}
      >
        <input
          type="text"
          onClick={() => console.log("Hello world")}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </>
  );

  /**
   * Obtains the search data
   * @return {React.Component}
   */
  async function handleSearch() {
    const configuration = {
      method: "get",
      url: `http://localhost:5100/search-artefacts/${searchText}`,
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
    };

    await axios(configuration)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.artefactRecords);
      })
      .catch((e) => {
        console.log(e.message);
      });
    // if (!response) {
    // // Do nothing
    // } else {
    // return response;
    // };
  }

  async function handleDashboard() {
    const configuration = {
      method: "get",
      url: "http://localhost:5100/data",
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
    };

    // make the API call
    const response = await axios(configuration);
    console.log(response);
    if (!response) {
    } else {
      return response;
    }
  }

  return (
    <>
      <div className="container">
        <div className="nav-container">
          <Navbar />
        </div>
        <div className="dashboard-header">
            <h2>My Artefacts</h2>

            <div
              className={
                isSearched
                  ? "dashboard-header__right-area post-search"
                  : "dashboard-header__right-area pre-search"
              }
            >
              <div
                className={
                  isSearched
                    ? "search-icon post-search"
                    : "search-icon pre-search"
                }
              >
                {searchContent}
              </div>

              <ViewToggle
                className="viewToggle"
                isToggled={isToggled}
                onToggle={() => setIsToggled(!isToggled)}
              />
            </div>
          </div>
          {isToggled ? (
            <ListView
              userData={userData}
              setUserData={setUserData}
              handleDashboard={isSearched ? handleSearch : handleDashboard}
            />
          ) : (
            <PictureMode
              userData={userData}
              setUserData={setUserData}
              handleDashboard={isSearched ? handleSearch : handleDashboard}
            />
          )}
      </div>
    </>
  );
};

function changeCallback(e, setter, callback) {
  e.preventDefault();
  setter(callback);
}

export default Dashboard;
