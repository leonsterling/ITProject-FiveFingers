import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import axios from 'axios';
import Cookies from "universal-cookie";

// Sass import
import './categories.scss';

export default function Categories ( { data, index, handleChange } ) {
  let [label, setLabel] = useState("Choose a category");
  let [categoryList, setCategoryList] = useState(null);

  let [isRetrieved, setRetrieved] = useState(false);

  // Changes based on what the user clicks - whether its outside the
  // categories button, the cancel button or the button itself
  let [isVisible, setVisibility] = useState(false);

  // Assign a button to every category we get
  let options;
  if (categoryList !== null) {
      options = categoryList.map( (data, index) => {
          return (
            <input key={index}
              className="category__option"
              type="button"
              value={data}
              onClick={() => {
                  setVisibility(false);
                  setLabel(data);

                  // Mimicks the event-handler
                  let e = {
                      target : {
                          name : "category",
                          value : data,
                      }
                  }
                  handleChange(e);
              }}
            />
          )
      });
  }

  // The base CSS class for the dropdown component
  const dropdownBaseClass = 'input-like category__dropdown ';

  // Uses CSS to make it visible based on whether it should be visible or not
  let dropdownClass = dropdownBaseClass + (isVisible ? 'visible' : 'hidden');

  useEffect(() => {
      if (!isRetrieved) {
          let uri = data.label === 'Category' ? 'categories' : 'associated';
          let parsefn = data.label === 'Category' ? cleanCategories : cleanAssociated;
          getObject(uri, setCategoryList, parsefn);
          setRetrieved(true);
      }
  });

  return (
    <>
    <li key={index} className='category'>
      <label>{data.label}</label>
      <CategoryInput
        isVisible={isVisible}
        setVisibility={setVisibility}
        handleChange={handleChange}
        label={label}
      />

      {/* The dropdown component */}
      <div className={dropdownClass}>
        {options}

        {/* Add a final button to add a category */}
        <AddCategory />
        <CancelCategory setVisibility={setVisibility}/>
      </div>
    </li>
    <FocusState isVisible={isVisible} setVisibility={setVisibility} />
    </>
  );
}

function CategoryInput ( { isVisible, setVisibility, handleChange, label } ) {
    let icon = isVisible ? 'codicon:chevron-up' : 'codicon:chevron-down';
    let labelClass = (label === "Choose a category") ?
        'initial':
        '';
    return (
      <div
        className='input-like category-input'
        onClick={() => setVisibility(!isVisible)}
      >
        <span className={labelClass}> {label} </span>
        <Icon icon={icon}/>
      </div>
    );
}

function AddCategory () {
    return (
      <input
        className="category__add"
        type="button"
        value={"Add category"}
        onClick={() => console.log(`GoodBye`)}
      />
    )
}

function CancelCategory ( { setVisibility } ) {
    return (
      <input
        className="category__cancel"
        type="button"
        value={"Cancel"}
        onClick={() => setVisibility(false)}
      />
    )
}

function FocusState ( { isVisible, setVisibility } ) {
    let currState = isVisible ? 'focused visible' : 'focused hidden';
    return (
        <div
          className={currState}
          onClick={() => setVisibility(false)}
        >
        </div>
    )
}

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

async function getObject (requestURI, setCategoryList, parsefn) {
  const configuration = {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
    url: `http://localhost:5100/add-artefact/${requestURI}`,
  };

  
  await axios(configuration).then((res) => {
      let data = parsefn(res.data[requestURI]);
      console.log(res.data[requestURI]);
      setCategoryList(data);
  }).catch((err) => {
    console.log("fail login");
    console.log(err);
  });

}

function cleanCategories(array) {
    let finlist = [];
    for (let i = 0; i < array.length; i++) {
        let category = array[i].category_name;
        if (category === '' || category === ' ')
            continue;
        finlist.push(category);
    }
    return finlist;
}

function cleanAssociated(array) {
    let finlist = [];
    for (let i = 0; i < array.length; i++) {
        let category = array[i].person;
        if (category === '' || category === ' ')
            continue;
        finlist.push(category);
    }
    return finlist;
}


