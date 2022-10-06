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
  currSelected,
  setCurrSelected,
}) {

  let allButtons = buttonChoices.map( (value, _) => {
    console.log({currSelected})
    let chosenClass = value === currSelected ? 'active' : 'inactive';
    return (
      <button className={chosenClass} onClick={() => setCurrSelected(value)}>{value}</button>
    )
  });

  return (
    <>
      <Icon icon="akar-icons:search" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let currPromise;
          if (searchText === "") {
            setIsSearched(false);
            currPromise = handleDashboard();
          } else {
            setIsSearched(true);
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
