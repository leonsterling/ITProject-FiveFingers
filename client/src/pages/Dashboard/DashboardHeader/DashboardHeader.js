import ViewToggle from "./viewToggle";
import SearchContent from "./SearchContent";

function DashboardHeader({
  isSearched,
  searchContent,
  isToggled,
  setIsToggled,
  searchParams,
}) {
  return (
    <div className="dashboard-header">
      <h2>My Artefacts</h2>

      <div
        className={
          isSearched
            ? "dashboard-header__right-area post-search"
            : "dashboard-header__right-area pre-search"
        }
      >
        <div
          className={
            isSearched ? "search-icon post-search" : "search-icon pre-search"
          }
        >
          <SearchContent {...searchParams} />
        </div>

        <ViewToggle
          className="viewToggle"
          isToggled={isToggled}
          onToggle={() => setIsToggled(!isToggled)}
        />
      </div>
    </div>
  );
}

export default DashboardHeader;
