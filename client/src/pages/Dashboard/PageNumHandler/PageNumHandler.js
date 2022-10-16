import './PageNumHandler.scss';

// Imports of local utils
import {
  getPagePromise,
  getSearchCategoryPromise,
  getSearchAssociatedPromise,
} from "../../../utils/dataHandler";

import {} from "../../../utils/dataHandler";

const NUM_PAGES_BEFORE = 3;
const CSS_NON_CURRENT_PAGE = 'non-current-page';
const CSS_CURRENT_PAGE = 'current-page';

function PageNumHandler( { numPages, setNumPages, currPageNum, setCurrPageNum, setUserData, currRendered, searchText, setOpen } ) {
    let data = {currPageNum, numPages, currRendered, searchText};
    let setters = {setCurrPageNum, setUserData, setNumPages, setOpen};
    let allButtons = []
    if (currPageNum > NUM_PAGES_BEFORE + 1) {
        // Add the first page in
        allButtons.push(buttonAtIndex(1, CSS_NON_CURRENT_PAGE, data, setters));

        // Add 3 dots after the first button is rendered
        allButtons = allButtons.concat(dotList());
    }
    // Change this variable to 1 to render every single page
    let startPageNum = getStartPageNum(currPageNum);
    let endPageNum = ((currPageNum + NUM_PAGES_BEFORE) > numPages)
      ? numPages
      : currPageNum + NUM_PAGES_BEFORE;
    allButtons = allButtons.concat(showAllButtons(
        startPageNum,
        endPageNum,
        currPageNum,
        data,
        setters
    ));

    if (endPageNum < numPages) {
        if (endPageNum !== numPages - 1) {
          // Add 3 dots before the last button is rendered
          allButtons = allButtons.concat(dotList());
        }
        allButtons.push(buttonAtIndex(numPages, CSS_NON_CURRENT_PAGE, data, setters));
    }

    return (
        <div className='page-handler'>
          <IncrementButton
            data={data}
            setters={setters}
            message={"Previous"}
            incrementValue={-1}
          />
          {allButtons}
          <IncrementButton
            data={data}
            setters={setters}
            message={"Next"}
            incrementValue={1}
          />
        </div>
    )
}

function handleClick (currButtonNum, data, setters) {
    if (currButtonNum === data.currPageNum) {
        console.log("If guard's fault");
        console.log( { currButtonNum } );
        return;
    }
    setters.setCurrPageNum(currButtonNum);

    let currPromise;
    switch (data.currRendered) {
      case "Dashboard":
        getPagePromise(currButtonNum)
          .then((res) => {
            setters.setOpen(false);
            setters.setUserData(res.data.dataInPage);
          })
          .catch((e) => {
            console.log(e.message);
          });
        break;
      default:
        switch (data.currRendered) {
          case "Category":
            currPromise = getSearchCategoryPromise(data.searchText, currButtonNum);
            break;
          case "Associated":
            currPromise = getSearchAssociatedPromise(data.searchText, currButtonNum);
            break;
          default:
            break;
        }
        currPromise
          .then((res) => {
            console.log(res.data)
            setters.setUserData(res.data.searched);
            setters.setNumPages(res.data.totalPages);
          })
          .catch((e) => {
            console.log(e.message);
          });
        break;
    }
}

function showAllButtons(startPageNum, numPages, currPageNum, data, setters) {
  let isCurrPage;
  let className;
  let finList = []
  
  // Special case for page 5
  if (currPageNum === 5) {
      startPageNum++;
  }

  for (let i = startPageNum; i <= numPages; i++) {
    className = (i === currPageNum)
      ? CSS_CURRENT_PAGE
      : CSS_NON_CURRENT_PAGE;
    finList.push(buttonAtIndex(i, className, data, setters))
  }
  return finList;
}

function buttonAtIndex(index, className, data, setters) {
    return (
        <button
          className={className}
          onClick={() => handleClick(index, data, setters)}
        >
          {index}
        </button>
    )
}

/* Gets the starting page number
 * @param candidatePageNum  the current page number
 * @return a positive natural number representing the page number
 */
function getStartPageNum(candidatePageNum) {
  let calculatedPageNum = candidatePageNum - NUM_PAGES_BEFORE
  if (calculatedPageNum < 1) {
      return 1;
  }
  return calculatedPageNum;
}

function dotList() {
  let finList = []
  for (let i = 0; i < 3; i++) {
    finList.push(
        <div className='dot'></div>
    )
  }
  return finList;
}

function IncrementButton ( { data, setters, message, incrementValue }) {
    if (data.numPages > 1) {
      return (
          <button className="increment-button" onClick={() => {
              let newButtonNum = data.currPageNum+incrementValue;
              if (newButtonNum >= 1 && newButtonNum <= data.numPages) {
                handleClick(newButtonNum, data, setters);
              }
          }}>
            {message}
          </button>
      )
    }
}

export default PageNumHandler;
