import FileBase from "react-file-base64";

/**
 * The component initially shown when the page is first entered. Provides
 * a big button to add an image
 * @return {React.Component}
 */
function UploadPending({ setRecord, record }) {
  return (
    <>
      <label className="data-entry-fields--image-upload--description">
        Upload Image
      </label>
      <label className="data-entry-fields--image-upload--upload-button">
        <FileBase
          type="file"
          name="artefactImg"
          multiple={false}
          onDone={({ base64, name, size, type}) => 
            setRecord({ ...record, 
              artefactImg: base64,
              nameImg: name,
              sizeImg: size,
              typeImg: type })}
        />
        Drop your images here, or select <span>click to browse</span>
      </label>
    </>
  );
}

export default UploadPending;
