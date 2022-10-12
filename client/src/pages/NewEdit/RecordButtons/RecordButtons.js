import { Link } from "react-router-dom";

function RecordButtons() {
  return (
    <div className="response-button" id="button">
      <Link to={`/dashboard`}>
        <button className="response-button__cancel" type="submit">
          Cancel
        </button>
      </Link>
      <button className="response-button__submit" type="submit">
        Submit
      </button>
    </div>
  );
}

export default RecordButtons;
