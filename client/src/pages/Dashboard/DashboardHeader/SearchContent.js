import { Icon } from "@iconify/react";

function SearchContent({
  searchText,
  setUserData,
  setSearchText,
  setIsSearched,
  handleDashboard,
  setGetArtefactCallback,
  handleSearch,
}) {
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
            currPromise = handleSearch(searchText);
          }
          currPromise
            .then((res) => {
              console.log(res.data);
              setUserData(res.data.artefactRecords);
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
    </>
  );
}

export default SearchContent;
