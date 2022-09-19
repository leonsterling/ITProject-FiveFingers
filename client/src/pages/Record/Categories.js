import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import Cookies from "universal-cookie";

// Sass import
import "./categories.scss";

export default function Categories({ data, index, handleChange }) {
  let [label, setLabel] = useState("");
  let [categoryList, setCategoryList] = useState(null);
  let [filteredList, setFilteredList] = useState(null);

  let [isRetrieved, setRetrieved] = useState(false);

  // Changes based on what the user clicks - whether its outside the
  // categories button, the cancel button or the button itself
  let [isVisible, setVisibility] = useState(false);

  // Assign a button to every category we get
  let options;
  if (categoryList !== null) {
    let filteredArray 
    if (label !== null) {
        // Change the filtered list based on the label
        filteredArray = filterCategoryList(categoryList, label);
    }
    else {
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

  // The base CSS class for the dropdown component
  const dropdownBaseClass = "input-like category__dropdown ";

  // Uses CSS to make it visible based on whether it should be visible or not
  let dropdownClass = dropdownBaseClass + (isVisible ? "visible" : "hidden");

  useEffect(() => {
    if (!isRetrieved) {
      let uri =
        data.label === "Category" ? "get-categories" : "get-associated";

      let data_container =
        data.label === "Category" ? "category_name" : "person";

      getObject(uri, setCategoryList, data_container);
      setRetrieved(true);
    }
  });

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

          <CancelCategory setVisibility={setVisibility} />
        </div>
      </li>
      <FocusState isVisible={isVisible} setVisibility={setVisibility} />
    </>
  );
}

function CategoryInput({
  isVisible,
  setVisibility,
  handleChange,
  label,
  setLabel,
  data
}) {
  let icon = isVisible ? "codicon:chevron-up" : "codicon:chevron-down";
  let labelClass = label === "Choose a category" ? "initial" : "";
  return (
    <div
      className="input-like category-input"
      onClick={() => setVisibility(!isVisible)}
    >
      <input
        type="text"
      placeholder={"Enter a " + (data.name === 'category' ?
          'category':
          'person'
      )}
      value={label}
      onChange={(e) => {
        setLabel(e.target.value);
        e.target.name = data.name;
        e.target.value = e.target.value.trim();
        console.log(e.target.name);
        console.log(e.target.value);
        handleChange(e);
      }}/>
      <Icon icon={icon} />
    </div>
  );
}

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

function FocusState({ isVisible, setVisibility }) {
  let currState = isVisible ? "focused visible" : "focused hidden";
  return <div className={currState} onClick={() => setVisibility(false)}></div>;
}

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

async function getObject(requestURI, setCategoryList, data_container) {
  const configuration = {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
    url: `http://localhost:5100/${requestURI}`,
  };
  console.log(`http://localhost:5100/${requestURI}`)
  await axios(configuration)
    .then((res) => {
      console.log(res.data)
      let data = cleanCategories(res.data.result,  data_container);
      // console.log(res.data[requestURI]);
      setCategoryList(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function cleanCategories(array, data_container) {
  let finlist = [];
  for (let i = 0; i < array.length; i++) {
    let category = array[i][data_container];
    if (category === "" || category === " ") continue;
    finlist.push(category);
  }
  return finlist;
}

function filterCategoryList(array, label) {
  let finlist = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].startsWith(label)) {
        finlist.push(array[i]);
    }
  }
    return finlist;
}

