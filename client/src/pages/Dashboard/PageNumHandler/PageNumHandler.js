import './PageNumHandler.scss';

// Imports of local utils
import {
  getPagePromise,
  getSearchCategoryPromise,
  getSearchAssociatedPromise,
} from "../../../utils/dataHandler";

import {} from "../../../utils/dataHandler";

function PageNumHandler( { numPages, setNumPages, currPageNum, setCurrPageNum, setUserData, currSelected, searchText } ) {
    let allButtons = [];
    console.log({currSelected});

    console.log("NumPages", numPages);

    let className;
    let isCurrPage;
    for (let i = 1; i <= numPages; i++) {
      isCurrPage = (i === currPageNum);
      className = isCurrPage ? 'current-page' : 'non-current-page';
      console.log({ i, currPageNum });

      allButtons.push(
          <button
            className={className}
            onClick={() => handleClick(i, currPageNum, setCurrPageNum, setUserData, currSelected, searchText, setNumPages)}
          >
            {i}
          </button>
      )
    }

    return (
        <div className='page-handler'>
          {allButtons}
        </div>
    )
}

function handleClick (currButtonNum, currPageNum, setCurrPageNum, setUserData, currSelected, searchText, setNumPages) {
    if (currButtonNum === currPageNum) {
        console.log("If guard's fault");
        console.log( { currButtonNum } );
        return;
    }
    setCurrPageNum(currButtonNum);

    let currPromise;
    switch (currSelected) {
      case "Dashboard":
        getPagePromise(currButtonNum)
          .then((res) => {
            console.log(res.data);
            setUserData(res.data.dataInPage);
          })
          .catch((e) => {
            console.log(e.message);
          });
        break;
      default:
        switch (currSelected) {
          case "Category":
            currPromise = getSearchCategoryPromise(searchText, currButtonNum);
            break;
          case "Associated":
            currPromise = getSearchAssociatedPromise(searchText, currButtonNum);
            break;
          default:
            break;
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
        break;
    }
}

export default PageNumHandler;
