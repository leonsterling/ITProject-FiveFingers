import TextInsertField from "./TextInsertField/TextInsertField";
import ImageDisplay from "./ImageDisplay/ImageDisplay";

function DataEntryFields({ handleChange, record, setRecord, artefactDetails }) {
  let photo;
  if (artefactDetails){
    photo = artefactDetails.artefactImg.imgURL
  }
  return (
    <div className="data-entry-fields">
      {/* Add text data */}
      <TextInsertField
        handleChange={handleChange}
        artDetail = {record}
        recordData={artefactDetails}
      />

      {/* Image Display */}
      <div className="data-entry-fields--image-upload">
        <label className="data-entry-fields--image-upload--description">
          Artefact image
        </label>
        <div className="data-entry-fields--image-upload--upload-complete">
          <img
            src={photo}
            alt="No Images have been Uploaded Yet"
          />
        </div>
      </div>
    </div>
  );
}

export default DataEntryFields;
