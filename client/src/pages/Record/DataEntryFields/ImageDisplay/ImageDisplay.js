import UploadPending from "./UploadPending";
import UploadDone from "./UploadDone";

function ImageDisplay({ record, setRecord }) {
  let /** React.Component */ component =
      record.artefactImg === "" ? (
        <UploadPending setRecord={setRecord} record={record} />
      ) : (
        <UploadDone setRecord={setRecord} record={record} />
      );
  return <div className="data-entry-fields--image-upload">{component}</div>;
}

export default ImageDisplay;
