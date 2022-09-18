import React, { useState } from "react";
import { Icon } from '@iconify/react';
import { getObject } from './CategoryHandler';

// Sass import
import './categories.scss';

// Replace and retrieve from backend
const dummyCategories = [
    "Books",
    "Sculptures",
    "Photographs",
    "Furniture",
]

export default function Categories ( { data, index, handleChange } ) {
  console.log(getObject('category'));
  let [label, setLabel] = useState("Choose a category");

  // Changes based on what the user clicks - whether its outside the
  // categories button, the cancel button or the button itself
  let [isVisible, setVisibility] = useState(false);

  // Assign a button to every category we get
  let options = dummyCategories.map( (data, index) => {
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

  // The base CSS class for the dropdown component
  const dropdownBaseClass = 'input-like category__dropdown ';

  // Uses CSS to make it visible based on whether it should be visible or not
  let dropdownClass = dropdownBaseClass + (isVisible ? 'visible' : 'hidden');

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

