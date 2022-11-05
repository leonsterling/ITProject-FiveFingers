import { useState } from "react";
import FileBase from "react-file-base64";

const feedback = {
  initial: "",
  invalid: "Not a valid image, please try again"
}

/**
 * The component initially shown when the page is first entered. Provides
 * a big button to add an image
 * @return {React.Component}
 */
function UploadPending({ setRecord, record }) {
  let [feedbackMessage, setFeedbackMessage] = useState(feedback.initial);
  return (
    <>
      <label className="data-entry-fields--image-upload--description">
        Upload Image
      </label>
      <div className='upload-feedback'>{feedbackMessage}</div>
      <label className="data-entry-fields--image-upload--upload-button">
      <FileBase
            type="file"
            name="artefactImg"
            multiple={false}
            onDone={({ base64, name, size, type}) => {
              if (!type.startsWith("image")) {
                  setFeedbackMessage(feedback.invalid);
                  return;
              }
              setRecord({ ...record, 
                artefactImg: base64,
                nameImg: name,
                sizeImg: size,
                typeImg: type });
            }}
          />
        Drop your images here, or select <span>click to browse</span>
      </label>
    </>
  );
}

export default UploadPending;
