import { useEffect } from "react";

import PictureMode from "./PictureMode";
import ListView from "./ListView";
import EmptyUserData from "./EmptyUserData";

// Imports of local utils
import {
  getPagePromise,
} from "../../../utils/dataHandler";

function ArtefactView({
  isToggled,
  isSearched,
  searchText,
  userData,
  setUserData,
  currPageNum,
  setCurrPageNum,
  setNumPages,
  open,
  setOpen,
}) {
  /**
   * After rendering the basic component (without data), it calls the pre-set
   * callback function to fetch and set the data accordingly
   */
  useEffect(() => {
    getPagePromise(currPageNum)
      .then((res) => {
        console.log(res.data);
        if (res.data.dataPerPage == 0 && res.data.totalPages == 0) {
            setUserData(null);
            setNumPages(0);
            return;
        }
        setUserData(res.data.dataInPage);
        setNumPages(res.data.totalPages);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  let deleteMode = "dashboard"
  let nonEmptyComponent = isToggled ? (
    <ListView
      userData={userData}
      setUserData={setUserData}
      currPageNum={currPageNum}
      setCurrPageNum={setCurrPageNum}
      setNumPages={setNumPages}
      mode={deleteMode}
    />
  ) : (
    <PictureMode
      userData={userData}
      setUserData={setUserData}
      open={open}
      setOpen={setOpen}
      currPageNum={currPageNum}
      setCurrPageNum={setCurrPageNum}
      setNumPages={setNumPages}
      mode={deleteMode}
    />
  );
  
  let finComponent;
  if (userData == null) {
      finComponent = ( <EmptyUserData /> );
  }
  else {
      finComponent = nonEmptyComponent;
  }
  return finComponent;
}

export default ArtefactView;
