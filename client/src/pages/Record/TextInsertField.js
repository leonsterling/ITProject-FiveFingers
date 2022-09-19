import React from "react";
import Categories from './Categories'; 

export default function TextInsertField ( { handleChange } ) {
    const fieldData = require('./fields.json');

    const fieldComponents = fieldData.componentArray.map( (data, index) => {
        let component;
        switch (data.component) {
            case 'input':
                component = (
                  <GeneralInput
                    data={data}
                    index={index}
                    handleChange={handleChange}
                  />);
                break;

            case 'textarea':
                component = (
                    <TextArea
                    data={data}
                    index={index}
                    handleChange={handleChange}
                />);
                break;

            case 'category':
                component = (<Categories
                    data={data}
                    index={index}
                    handleChange={handleChange}
                />);
                break;

            default:
                component = (
                    <div>
                      WARNING: This component has been unaccounted for.
                      Please check the "component" tag of the fields.json file.
                    </div>
                )
        }
        return component;
    });

    return (
        <ul className='data-entry-fields--text-insert'>
          {fieldComponents}
        </ul>
    );
}

function TextArea ( { data, index, handleChange } ) {
    return (
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
}

function GeneralInput ( { data, index, handleChange } ) {
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

