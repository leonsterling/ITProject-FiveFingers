import React, { useState, useEffect, Component } from "react";

export default function TextInsertField ( { handleChange } ) {
    const fieldData = require('./fields.json');
    console.log(fieldData);

    const fieldComponents = fieldData.componentArray.map( (data, index) => {
        return (data.component === 'input') ?
        (
          <li key={index}>
            <label>{data.label}</label>
            <input
              name={data.name}
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
              name="description"
              id="description"
              type="text"
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


