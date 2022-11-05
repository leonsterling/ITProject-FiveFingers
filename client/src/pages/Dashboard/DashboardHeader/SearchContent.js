import { Icon } from "@iconify/react";
import { useState } from "react";
import { getSearchCategoryPromise, getSearchAssociatedPromise } from "../../../utils/dataHandler";

const buttonChoices = ["Category", "Associated"];
const FIRST_PAGE = 1;

// Imports of local utils
import {
  getPagePromise,
} from "../../../utils/dataHandler";

function SearchContent({
  searchText,
  setUserData,
  setSearchText,
  setIsSearched,
  setNumPages,
  currRendered,
  setCurrRendered,
  setCurrPageNum,
  setMessage
}) {

  let [ currSelected, setCurrSelected ] = useState("Category");
  let allButtons = buttonChoices.map( (value, _) => {
    let chosenClass = value === currSelected ? 'active' : 'inactive';
    return (
      <button className={chosenClass} onClick={() => {
        setCurrSelected(value);
      }}
      >
        {value}
      </button>
    )
  });

  return (
    <>
      <Icon icon="akar-icons:search" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          currRendered = currSelected;
          let currPromise;
          if (searchText === "") {
            console.log("This is an empty search");
            currPromise = getPagePromise(1);
            currRendered = "Dashboard"
          } else {
            setCurrPageNum(1);
            switch (currSelected) {
              case "Category":
                currPromise = getSearchCategoryPromise(searchText, 1);
                break;
              case "Associated":
                currPromise = getSearchAssociatedPromise(searchText, 1);
                break;
            }
          }
          setCurrRendered(currRendered);
          currPromise
            .then((res) => {
              console.log(res.data)
              console.log({ searchText });
              setCurrPageNum(FIRST_PAGE);
              if (buttonChoices.includes(currRendered)) {
                setUserData(res.data.searched);
                setMessage(res.data.message);
              }
              else {
                let chosenData = (res.data.dataInPage.length === 0) ? null : res.data.dataInPage;
                console.log(chosenData);
                setUserData(chosenData);
                setMessage("My Artefacts");
              }
              setNumPages(res.data.totalPages);
              if (res.data.message.startsWith('0')) {
                  setNumPages(0);
              }
            })
            .catch((e) => {
              console.log(e.message);
            });
        }}
      >
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      {allButtons}
    </>
  );
}

export default SearchContent;
