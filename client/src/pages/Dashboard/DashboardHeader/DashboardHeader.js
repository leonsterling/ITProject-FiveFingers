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
        <HeaderMessage message={message} />
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

function HeaderMessage ( { message } ) {
    let finMessage = (
        <h3 className='search-message-initial'>{message}</h3>
    );
    if (!(message === "My Artefacts")) {
        let messageList = message.split(' ');
        let query = messageList
          .slice(messageList.indexOf("query:")+1)
          .join(' ');
        finMessage = (
          <h3 className='search-message'>
            <b>{messageList[0]}</b> Artefacts in <b>{query}</b>
          </h3>
        )
    }

    return finMessage;
}

export default DashboardHeader;
