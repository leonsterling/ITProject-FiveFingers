import React from "react";
import { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';

// Replace and retrieve from backend
const dummyCategories = [
    "Books",
    "Sculptures",
    "Photographs",
    "Furniture",
]

export default function Categories ( { data, index, handleChange } ) {
  return (
    <li key={index} className='category'>
      <label>{data.label}</label>
      <input key={index}
        placeholder={'Hello world'}
        onChange={handleChange}
      />
    </li>
  );
}

