import { Link } from "react-router-dom";

function RecordButtons( { submitActive } ) {
  return (
    <div className="response-button" id="button">
      <Link to={`/dashboard`}>
        <button className="response-button__cancel" type="submit">
          Cancel
        </button>
      </Link>
      <button
        disabled={!submitActive}
        className={
          "response-button__submit" + (submitActive
              ? ""
              : " disabled"
          )}
        type="submit"
      >
        Submit
      </button>
    </div>
  );
}

export default RecordButtons;
