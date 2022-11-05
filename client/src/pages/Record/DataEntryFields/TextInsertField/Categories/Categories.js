/**
 * @fileoverview Implementation of the Add-artefact page
 * Uses:
 * - React for rendering HTML
 * - Axios for getting information from the serverside
 * - Universal Cookie for handling browser cookies and validating logins
 * - Iconify for adding icons
 */

// Imports of packages
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

// Imports of local utils
import { getCategoryPromise } from "../../../../../utils/dataHandler.js";

// Style-based imports
import "./categories.scss";

/**
 * The Categories feature that the client requested. Allows the user to add,
 * filter, and save their own custom categories
 * @return {React.Component}
 */
function Categories({ data, index, handleChange }) {
  let /** string */ [label, setLabel] = useState("");
  let /** Array<string> */ [categoryList, setCategoryList] = useState(null);

  let /** boolean */ [isRetrieved, setRetrieved] = useState(false);

  // Changes based on what the user clicks - whether its outside the
  // categories button, the cancel button or the button itself
  let /** boolean */ [isVisible, setVisibility] = useState(false);

  // Assign a button to every category we get
  let /** ?Array<React.Component> */ options;
  // Choose whether to add a final label to let the user know about a new
  // category
  let finlabel;
  if (categoryList !== null) {
    let /** Array<string> */ filteredArray;
    if (label !== null) {
      // Change the filtered list based on the label
      filteredArray = filterCategoryList(categoryList, label);
    } else {
      filteredArray = categoryList;
    }
    options = filteredArray.map((categoryData, index) => {
      return (
        <input
          key={index}
          className="category__option"
          type="button"
          value={categoryData}
          onClick={() => {
            setVisibility(false);
            setLabel(categoryData);

            console.log(categoryData);

            // Mimicks the event-handler
            console.log(data.name);
            let e = {
              target: {
                name: `${data.name}`,
                value: categoryData,
              },
            };
            handleChange(e);
          }}
        />
      );
    });
  }
  
  if (options && options.length === 0 && label.length > 0) {
      isVisible = false;
      finlabel = (
          <p className="feedback">
            Adding new {data.label}: <br/>
            <span className="label">{label}</span>
          </p>
      )
  }

  // The base CSS class for the dropdown component
  const /** string */ dropdownBaseClass = "input-like category__dropdown ";

  // Uses CSS to make it visible based on whether it should be visible or not
  let /** string */ dropdownClass =
      dropdownBaseClass + (isVisible ? "visible" : "hidden");

  useEffect(() => {
    if (!isRetrieved) {
      let /** string */ uri =
          data.label === "Category" ? "get-categories" : "get-associated";

      let /** string */ data_container =
          data.label === "Category" ? "category_name" : "person";

      getObject(uri, setCategoryList, data_container);
      setRetrieved(true);
    }
  }, [isRetrieved, data.label]);

  return (
    <>
      <li key={index} className="category">
        <label>{data.label}</label>
        <CategoryInput
          isVisible={isVisible}
          setVisibility={setVisibility}
          handleChange={handleChange}
          label={label}
          setLabel={setLabel}
          data={data}
        />

        {/* The dropdown component */}
        <div className={dropdownClass}>
          {options}
        </div>
        {finlabel}
      </li>
      <FocusState isVisible={isVisible} setVisibility={setVisibility} />
    </>
  );
}

/**
 * The text input where the user enters their categories
 * @return {React.Component}
 */
function CategoryInput({
  isVisible,
  setVisibility,
  handleChange,
  label,
  setLabel,
  data,
}) {
  let /** string */ icon = isVisible
      ? "codicon:chevron-up"
      : "codicon:chevron-down";
  return (
    <div
      className="input-like category-input"
      onClick={() => setVisibility(!isVisible)}
    >
      <input
        type="text"
        placeholder={
          "Enter a " + (data.name === "category" ? "category" : "person")
        }
        value={label}
        onChange={(e) => {
          setLabel(e.target.value);
          setVisibility(true);
          e.target.name = data.name;
          e.target.value = e.target.value.trim();
          console.log(e.target.name);
          console.log(e.target.value);
          handleChange(e);
        }}
      />
      <Icon icon={icon} />
    </div>
  );
}

/**
 * The Cancel button that shows up in the popup menu, after the user clicks
 * on the text-input field
 * @return {React.Component}
 */
function CancelCategory({ setVisibility }) {
  return (
    <input
      className="category__cancel"
      type="button"
      value={"Cancel"}
      onClick={() => setVisibility(false)}
    />
  );
}

/**
 * An invisible div that allows the user to click anywhere outside the
 * category component to remove the categories popup
 * @return {React.Component}
 */
function FocusState({ isVisible, setVisibility }) {
  let /** string */ currState = isVisible
      ? "focused visible"
      : "focused hidden";
  return <div className={currState} onClick={() => setVisibility(false)}></div>;
}

/**
 * Gets the repective categoryList from the server, based on the requestURI
 * and sets the category list accordingly
 * @param {string} requestURI        the URI that decides whether its a
 *                                   `Category` type or a `Person Associated`
 *                                   type
 * @param {callback} setCategoryList the callback that changes the
 *                                   category list based on the retrieved data
 * @param {string} data_container    the key value that the client-side would
 *                                   have to hash-index in order to get the
 *                                   data
 */
async function getObject(requestURI, setCategoryList, data_container) {
  await getCategoryPromise(requestURI)
    .then((res) => {
      let data = cleanCategories(res.data.result, data_container);
      setCategoryList(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Grabs the data from the categories, removes unwanted values (like empty
 * strings) and returns a cleaned-up list
 * @return {Array<string>} a list of strings that contain the relevant
 *                         categories
 */
function cleanCategories(array, data_container) {
  let finlist = [];
  for (let i = 0; i < array.length; i++) {
    let category = array[i][data_container];
    if (category === "" || category === " ") continue;
    finlist.push(category);
  }
  return finlist;
}

/**
 * Grabs the data from the categories, only keeps values corresponding to the
 * inputted label and returns a filtered list
 * @return {Array<string>} a list of strings that contain the relevant
 *                         categories
 */
function filterCategoryList(array, label) {
  let finlist = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].startsWith(label)) {
      finlist.push(array[i]);
    }
  }
  return finlist;
}

export default Categories;
