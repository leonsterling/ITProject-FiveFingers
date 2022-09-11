import React, { useState, useEffect, Component } from "react";



export default function TextUpdateField ( { handleChange, initialData }) {
    const fieldData = require('./editfields.json');
    console.log({initialData});
    const fieldComponents = fieldData.componentArray.map( (data, index) => {
      
      return (data.component === 'input') ?
        (
          <li key={index}>
            <label>{data.label}</label>
            <input
              name={data.name}
              value ={initialData[data.name]}
              placeholder={data.placeholder}
              type={data.type}
              onChange={handleChange}
            />
          </li>
        )
        : // else
        (
          <li key={index}>
            <label>{data.label}</label>
            <textarea
              className="descriptionArea"
              value = {initialData[data.name]}
              name= {data.name}
              id="description"
              type= {data.type}
              rows="6"
            
              tabIndex={"2"}
              onChange={handleChange}
              maxLength = {2000}
              placeholder = {data.placeholder}
            />
          </li>
        );
    });

    return (
        <ul className='data-entry-fields--text-insert'>
          {fieldComponents}
        </ul>
    )
}


