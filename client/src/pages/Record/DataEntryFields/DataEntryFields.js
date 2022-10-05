import TextInsertField from "./TextInsertField/TextInsertField";
import ImageDisplay from "./ImageDisplay/ImageDisplay";

function DataEntryFields({ handleChange, record, setRecord }) {
  return (
    <div className="data-entry-fields">
      {/* Add text data */}
      <TextInsertField handleChange={handleChange} />

      {/* Upload Images */}
      <ImageDisplay record={record} setRecord={setRecord} />
    </div>
  );
}

export default DataEntryFields;
