import UploadPending from "./UploadPending";
import UploadDone from "./UploadDone";

function ImageDisplay({ record, setRecord, details }) {
  if (details){
    record.artefactImg = details.artefactImg.imgURL
  }
  let /** React.Component */ component =
      record.artefactImg === "" ? (
        <UploadPending setRecord={setRecord} record={record} />
      ) : (
        <UploadDone setRecord={setRecord} record={record} artefact = {details} />
      );
  return <div className="data-entry-fields--image-upload">{component}</div>;
}

export default ImageDisplay;
