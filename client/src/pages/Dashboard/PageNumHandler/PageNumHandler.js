import './PageNumHandler.scss';

// Imports of local utils
import {
  getPagePromise,
  getSearchCategoryPromise,
  getSearchAssociatedPromise,
} from "../../../utils/dataHandler";

import {} from "../../../utils/dataHandler";

function PageNumHandler( { numPages, setNumPages, currPageNum, setCurrPageNum, setUserData, currRendered, searchText, setOpen } ) {
    let allButtons = [];
    console.log({currRendered});

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
            onClick={() => handleClick(i, currPageNum, setCurrPageNum, setUserData, currRendered, searchText, setNumPages, setOpen)}
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

function handleClick (currButtonNum, currPageNum, setCurrPageNum, setUserData, currRendered, searchText, setNumPages, setOpen) {
    if (currButtonNum === currPageNum) {
        console.log("If guard's fault");
        console.log( { currButtonNum } );
        return;
    }
    setCurrPageNum(currButtonNum);

    let currPromise;
    switch (currRendered) {
      case "Dashboard":
        getPagePromise(currButtonNum)
          .then((res) => {
            setOpen(false);
            setUserData(res.data.dataInPage);
          })
          .catch((e) => {
            console.log(e.message);
          });
        break;
      default:
        switch (currRendered) {
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
