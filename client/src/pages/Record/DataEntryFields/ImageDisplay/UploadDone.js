import FileBase from "react-file-base64";

/**
 * The component that comes up after an image has been added after the first
 * time. Showcases the previous image and also provides an option to upload a
 * different image
 * @return {React.Component}
 */
function UploadDone({ record, setRecord }) {
  return (
    <>
      <label className="data-entry-fields--image-upload--description">
        Selected Image
      </label>
      <label>
        <div className="data-entry-fields--image-upload--upload-complete">
          <img src={record.artefactImg} alt="" />
        </div>
      </label>
      <label className="data-entry-fields--image-upload--restart">
        Not satisfied?
        <label>
          Upload again
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
        </label>
      </label>
    </>
  );
}

export default UploadDone;
