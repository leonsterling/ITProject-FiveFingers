import { useEffect } from "react";
import PictureMode from "./PictureMode";
import ListView from "./ListView";

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
        setUserData(res.data.dataInPage);
        setNumPages(res.data.totalPages);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  let component = isToggled ? (
    <ListView
      userData={userData}
      setUserData={setUserData}
    />
  ) : (
    <PictureMode
      userData={userData}
      setUserData={setUserData}
      open={open}
      setOpen={setOpen}
    />
  );
  return component;
}

export default ArtefactView;
