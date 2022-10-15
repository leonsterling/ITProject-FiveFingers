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
              }
              else {
                setUserData(res.data.dataInPage);
              }
              setNumPages(res.data.totalPages);
            })
            .catch((e) => {
              console.log(e.message);
            });
        }}
      >
        <input
          type="text"
          onClick={() => console.log("Hello world")}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      {allButtons}
    </>
  );
}

export default SearchContent;
