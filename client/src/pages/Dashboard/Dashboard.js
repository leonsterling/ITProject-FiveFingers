import React, { useState } from "react";
import ViewToggle from "./viewToggle";
import PictureMode from "./PictureMode";
import ListView from "../ListView/ListView";
import Navbar from "./Navbar";
import { Icon } from "@iconify/react";
import axios from "axios";

// CSS imports
import "./Dashboard.css";

import Cookies from "universal-cookie";
// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const Dashboard = () => {
  const [isToggled, setIsToggled] = useState(false);
  let [userData, setUserData] = useState(null);
  let [searchClicked, setSearchClick] = useState(false);
  let [searchText, setSearchText] = useState("");
  let [getArtefactCallback, setGetArtefactCallback] = useState(handleDashboard);

  let [isSearched, setIsSearched] = useState(false);

  let searchContent = (
    <>
      <Icon icon="akar-icons:search" />
      <form
        onSubmit={(e) => {
          if (searchText === "") {
            setIsSearched(false);
            handleDashboard();
          } else {
            setIsSearched(true);
            changeCallback(e, setGetArtefactCallback, handleSearch);
          }
          
          console.log(isSearched);
          console.log(searchText);
        }}
      >
        <input
          type="text"
          className=""
          onClick={() => console.log("Hello world")}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </>
  );

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
                onClick={() => setSearchClick(true)}
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
      </div>
    </>
  );
};

function changeCallback(e, setter, callback) {
  e.preventDefault();
  setter(callback);
}

export default Dashboard;
