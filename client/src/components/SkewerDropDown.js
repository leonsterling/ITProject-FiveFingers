import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Skewer.scss";

import { deleteArtefact, getPagePromise } from "../utils/dataHandler";

const SkewerDropDown = ({ _id, setUserData, currPageNum, setCurrPageNum, setNumPages }) => {
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
            <span>Delete Artefact?</span>
          </div>
          <div className="button-choices">
            <button
              className="no"
              onClick={() => setConfirmVisible(" invisible")}
            >
              Cancel
            </button>
            <button className="yes" onClick={() => {
                
                // TODO: re-set the user data at the page
                let pageProps = {
                  setUserData,
                  currPageNum,
                  setCurrPageNum,
                  setNumPages
                }
                setDataAccordingly(pageProps, _id);
            }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

async function setDataAccordingly(pageProps, _id) {
  await deleteArtefact(_id)
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e.message);
    });
  getPagePromise(pageProps.currPageNum)
    .then((res) => {
      if (res.data.totalPages < pageProps.currPageNum) {
          pageProps.currPageNum = res.data.totalPages;
          setDataAccordingly(pageProps, _id);
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
