import './PageNumHandler.scss';

// Imports of local utils
import {
  getPagePromise,
} from "../../../utils/dataHandler";


function PageNumHandler( { numPages, currPageNum, setCurrPageNum, setUserData } ) {
    let allButtons = [];

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
            onClick={() => handleClick(i, currPageNum, setCurrPageNum, setUserData)}
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

function handleClick (currButtonNum, currPageNum, setCurrPageNum, setUserData) {
    if (currButtonNum === currPageNum) {
        console.log("If guard's fault");
        console.log( { currButtonNum } );
        return;
    }
    setCurrPageNum(currButtonNum);
    getPagePromise(currButtonNum)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.dataInPage);
      })
      .catch((e) => {
        console.log(e.message);
      });
}

export default PageNumHandler;
