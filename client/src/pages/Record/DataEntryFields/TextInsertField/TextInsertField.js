/**
 * @fileoverview Abstraction of all text-insert fields, to provide Team
 *               FiveFingers the ability to change input fields with agility
 * Uses:
 * - React for rendering HTML
 */

// Imports of packages
import React from "react";

// Imports of local components
import Categories from "./Categories/Categories.js";

/**
 * The component that contains all the text-input field data, based on the
 * `fields.json` file
 * @return {React.Component}
 */
function TextInsertField({ handleChange }) {
  // This is the only file that will need to be changed if the client ever
  // suddenly changes his specification
  const /** !file */ fieldData = require("./fields.json");

  const /** Array<React.Component> */ fieldComponents =
      fieldData.componentArray.map((data, index) => {
        let component;
        // The switch-case takes information about which component the client
        // wants in order and renders it accordingly
        switch (data.component) {
          case "input":
            component = (
              <GeneralInput
                data={data}
                index={index}
                handleChange={handleChange}
              />
            );
            break;

          case "textarea":
            component = (
              <TextArea data={data} index={index} handleChange={handleChange} />
            );
            break;

          case "category":
            component = (
              <Categories
                data={data}
                index={index}
                handleChange={handleChange}
              />
            );
            break;

          default:
            component = (
              <div>
                WARNING: This component has been unaccounted for. Please check
                the "component" tag of the fields.json file.
              </div>
            );
        }
        return component;
      });

  return <ul className="data-entry-fields--text-insert">{fieldComponents}</ul>;
}

/**
 * If data.component is 'textarea', then this component will render
 * @return {React.Component}
 */
function TextArea({ data, index, handleChange }) {
  return (
    <li key={index}>
      <label>{data.label}</label>
      <textarea
        className="descriptionArea"
        name={data.name}
        id="description"
        type="text"
        rows="6"
        tabIndex={"2"}
        onChange={handleChange}
        maxLength={2000}
        placeholder={data.placeholder}
      />
    </li>
  );
}

/**
 * If data.component is 'input', then this component will render
 * @return {React.Component}
 */
function GeneralInput({ data, index, handleChange }) {
  return (
    <li key={index}>
      <label>{data.label}</label>
      <input
        name={data.name}
        placeholder={data.placeholder}
        type={data.type}
        onChange={handleChange}
      />
    </li>
  );
}

export default TextInsertField;
