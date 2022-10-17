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

// Imports of local components
import Navbar from "../../components/Navbar";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import ArtefactView from "./ArtefactView/ArtefactView";
import PageNumHandler from "./PageNumHandler/PageNumHandler";

// Imports of local utils
import {
  getInitDashboardPromise,
  getSearchPromise,
  getSearchCategoryPromise,
  getPagePromise,
  getSearchAssociatedPromise
} from "../../utils/dataHandler";

// Style-based imports
import "./Dashboard.css";

/**
 * The Dashboard page. Retrieves the artefacts that have been stored in
 * the database and shows it to the user
 * @return {React.Component}
 */
function Dashboard() {
  const /** boolean */ [isToggled, setIsToggled] = useState(false);
  let /** ?string */ [userData, setUserData] = useState(null);
  let /** string */ [searchText, setSearchText] = useState("");
  let /** callback */ setGetArtefactCallback = useState()[1];

  let /** boolean */ [isSearched, setIsSearched] = useState(false);

  let /** number */ [numPages, setNumPages] = useState(0);
  let /** number */ [currPageNum, setCurrPageNum] = useState(1);

  let /** string */ [ currRendered, setCurrRendered ] = useState("Dashboard");

  let /** string */ [open, setOpen] = useState(false);
  let /** string */ [message, setMessage] = useState("My Artefacts");

  let searchParams = {
    searchText,
    setSearchText,
    setUserData,
    setIsSearched,
    handleSearch,
    setNumPages,
    setCurrPageNum,
    currRendered,
    setCurrRendered,
    setMessage
  };

  return (
    <div className="container">
      <Navbar />
      <DashboardHeader
        isSearched={isSearched}
        isToggled={isToggled}
        setIsToggled={setIsToggled}
        searchParams={searchParams}
        message={message}
      />
      <ArtefactView
        isToggled={isToggled}
        searchText={searchText}
        userData={userData}
        setUserData={setUserData}
        handleSearch={handleSearch}
        isSearched={isSearched}
        getPagePromise={getPagePromise}
        currPageNum={currPageNum}
        setCurrPageNum={setCurrPageNum}
        setNumPages={setNumPages}
        open={open}
        setOpen={setOpen}
      />
      <PageNumHandler
        numPages={numPages}
        setNumPages={setNumPages}
        currPageNum={currPageNum}
        setCurrPageNum={setCurrPageNum}
        setUserData={setUserData}
        currRendered={currRendered}
        searchText={searchText}
        setOpen={setOpen}
      />
    </div>
  );
}

/**
 * Obtains the search data and changes the dashboard components accordingly
 */
async function handleSearch(searchText) {
  return await getSearchPromise(searchText);
}

export default Dashboard;
