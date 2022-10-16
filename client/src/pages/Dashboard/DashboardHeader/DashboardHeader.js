import ViewToggle from "./viewToggle";
import SearchContent from "./SearchContent";

function DashboardHeader({
  isSearched,
  searchContent,
  isToggled,
  setIsToggled,
  searchParams,
  message,
}) {
  return (
    <div className="dashboard-header">
      <div className='dashboard-header__left-area'>
        <h2>{message}</h2>
        <ViewToggle
          className="viewToggle"
          isToggled={isToggled}
          onToggle={() => setIsToggled(!isToggled)}
        />
      </div>

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
