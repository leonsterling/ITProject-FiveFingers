import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Skewer.scss";

import { deleteArtefact, getPagePromise } from "../utils/dataHandler";

const SkewerDropDown = ({ _id, setUserData, currPageNum, setCurrPageNum, setNumPages, mode }) => {
  let /** React.Component */ FullviewLink = window.location.href.includes(
      `full-view/${_id}`
    ) ? (
      <div
        className="skewer-dropdown-item"
        onClick={() => window.location.reload()}
      >
        <div className="link-line">View Full Details</div>
      </div>
    ) : (
      /* else */ <div className="skewer-dropdown-item">
        <Link to={`/full-view/${_id}`} className="link-line">
          View Full Details
        </Link>
      </div>
    );

  let [confirmVisible, setConfirmVisible] = useState(" invisible");

  return (
    <>
      <div className="skewer-dropdown">
        <div className="text-left">
          <div className="skewer-dropdown-item">
            <Link to={`/edit-artefact/${_id}`} className="link-line">
              Edit
            </Link>
          </div>
          <div
            className="skewer-dropdown-item"
            onClick={() => setConfirmVisible(" visible")}
          >
            <span className="link-line">Delete</span>
          </div>
          {FullviewLink}
        </div>
      </div>
      <div
        className={"confirm-delete" + confirmVisible}
        onClick={(e) => setConfirmVisible(" invisible")}
      >
        <div className="delete-message-container" onClick={(e) => e.stopPropagation()}>
          <div className="message">
            <span>Delete artefact?</span>
          </div>
          <div className="button-choices">
            <button
              className="no"
              onClick={() => setConfirmVisible(" invisible")}
            >
              Cancel
            </button>
            <button className="yes" onClick={() => {

                if (mode && mode==="dashboard") {
                  let pageProps = {
                    setUserData,
                    currPageNum,
                    setCurrPageNum,
                    setNumPages
                  }
                  setDashboardData(pageProps, _id);
                }
                else {
                  // Handle it for the full view
                  let currUrl = window.location.href.split('/');
                  let currId = currUrl[currUrl.indexOf("full-view") + 1];
                  deleteArtefact(currId)
                    .then((_res) => {
                      window.location.href = '/'
                    })
                    .catch((e) => {
                      console.log("e is:", e);
                      console.log(e.message);
                    });
                  
                }
            }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

async function setDashboardData(pageProps, _id) {
  await deleteArtefact(_id)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e.message);
    });
  let chosenPage = pageProps.currPageNum ? pageProps.currPageNum : 1;
  getPagePromise(chosenPage)
    .then((res) => {
      if (res.data.totalPages < pageProps.currPageNum) {
          pageProps.currPageNum = res.data.totalPages;
          if (res.data.dataPerPage == 0 && res.data.totalPages == 0) {
            pageProps.setUserData(null);
            pageProps.setNumPages(0);
            return;
          }
          setDashboardData(pageProps, _id);
          return;
      }
      pageProps.setUserData(res.data.dataInPage);
      pageProps.setCurrPageNum(pageProps.currPageNum);
      pageProps.setNumPages(res.data.totalPages);
    })
    .catch((e) => {
      console.log(e.message);
    });
}

export default SkewerDropDown;
