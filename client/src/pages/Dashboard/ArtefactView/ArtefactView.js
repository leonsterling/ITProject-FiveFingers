import { useEffect } from "react";
import PictureMode from "./PictureMode";
import ListView from "./ListView";

function ArtefactView({
  isToggled,
  isSearched,
  searchText,
  userData,
  setUserData,
  handleDashboard,
}) {
  /**
   * After rendering the basic component (without data), it calls the pre-set
   * callback function to fetch and set the data accordingly
   */
  useEffect(() => {
    handleDashboard()
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.artefactRecords);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  let component = isToggled ? (
    <ListView
      userData={userData}
      setUserData={setUserData}
      handleDashboard={handleDashboard}
    />
  ) : (
    <PictureMode userData={userData} setUserData={setUserData} />
  );
  return component;
}

export default ArtefactView;
