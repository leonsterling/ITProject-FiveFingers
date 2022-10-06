import { Icon } from "@iconify/react";
import { useState } from "react";
import { getSearchCategoryPromise, getSearchAssociatedPromise } from "../../../utils/dataHandler";

const buttonChoices = ["Category", "Associated"];

function SearchContent({
  searchText,
  setUserData,
  setSearchText,
  setIsSearched,
  handleDashboard,
  setNumPages,
  currRendered,
  setCurrRendered,
  setCurrPageNum,
}) {

  let [ currSelected, setCurrSelected ] = useState("Category");
  let allButtons = buttonChoices.map( (value, _) => {
    console.log({currRendered})
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
          setCurrRendered(currSelected);
          let currPromise;
          if (searchText === "") {
            currPromise = handleDashboard();
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
          currPromise
              .then((res) => {
                console.log(res.data)
                console.log({ searchText });
                setUserData(res.data.searched);
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
