import React, { useState, useEffect, Component } from "react";
import { getCategoryPromise } from "../../utils/dataHandler.js";

// Imports of local components
import Categories from "./Categories/Categories.js";

/**
 * The component that contains all the text-input field data, based on the
 * `fields.json` file
 * @return {React.Component}
 */

export default function TextUpdateField({
  handleChange,
  initialData,
  cat,
  per,
}) {
  //console.log(test["category_name"]);
  const fieldData = require("./editfields.json");
  const fieldComponents = fieldData.componentArray.map((data, index) => {
    if (data.component === "textarea") {
      return (
        <li key={index}>
          <label>{data.label}</label>
          <textarea
            name={data.name}
            value={initialData[data.name]}
            placeholder={data.placeholder}
            type={data.type}
            onChange={handleChange}
            rows={"6"}
            maxLength={2000}
            tabIndex={"2"}
          />
        </li>
      );
    } else if (data.name === "category") {
      return (
        <Categories
          data={data}
          index={index}
          handleChange={handleChange}
          val={initialData}
        />
      );
    } else if (data.name === "associated") {
      return (
        <Categories
          data={data}
          index={index}
          handleChange={handleChange}
          val={initialData}
        />
      );
    } else if (data.component === "input") {
      return (
        <li key={index}>
          <label>{data.label}</label>
          <input
            name={data.name}
            value={initialData[data.name]}
            placeholder={data.placeholder}
            type={data.type}
            onChange={handleChange}
          />
        </li>
      );
    } else {
      return (
        <li key={index}>
          <label>{data.label}</label>
          <input
            name={data.name}
            value={initialData[data.name]}
            placeholder={data.placeholder}
            type={data.type}
            onChange={handleChange}
          />
        </li>
      );
    }
  });

  return <ul className="data-entry-fields--text-insert">{fieldComponents}</ul>;
}
