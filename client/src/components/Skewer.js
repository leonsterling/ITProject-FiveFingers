import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import SkewerButton from "./SkewerButton";
import SkewerDropDown from "./SkewerDropDown";
import "./Skewer.scss";

const Skewer = ({ _id, setUserData, currPageNum, setCurrPageNum, setNumPages, mode }) => {
  const [openSkewer, setOpenSkewer] = useState(false);
  const drop = useRef(null);

  function handleClick(e) {
    if (!e.target.closest(`.${drop.current.className}`) && openSkewer) {
      setOpenSkewer(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <>
      <div className="skewer-component" ref={drop}>
        <SkewerButton onClick={() => setOpenSkewer(!openSkewer)} />
        {openSkewer && (
          <SkewerDropDown
            _id={_id}
            setUserData={setUserData}
            currPageNum={currPageNum}
            setCurrPageNum={setCurrPageNum}
            setNumPages={setNumPages}
            mode={mode}
          />
        )}
      </div>
    </>
  );
};

export default Skewer;
