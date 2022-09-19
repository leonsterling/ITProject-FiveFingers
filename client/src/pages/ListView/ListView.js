import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

import "./ListView.css";

// Import Authentication and Cookies
const cookies = new Cookies();
const token = cookies.get("TOKEN");

const ListView = () => {
  const [rowList, setList] = useState([]);

  const configuration = {
    method: "get",
    url: `http://localhost:5100/data`,
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  };

  useEffect(function () {
    async function getCruds() {
      try {
        const response = await axios(configuration);
        //console.log(JSON.stringify(response.data));
        setList(response.data.artefactRecords);
      } catch (error) {
        console.log("error", error);
      }
    }
    getCruds();
  }, []);

  let row = null;
  if (rowList) {
    row = rowList.map(
      ({ _id, artefactName, description, associated, category }) => (
        <tr className='table-body' key={_id}>
          <td className='table-cell' id="name-cell">{artefactName}</td>
          <td className='table-cell' id="desc-cell">{description.substring(0, 60)}</td>
          <td className='table-cell' id="category-cell">{category.category_name}</td>
          <td className='table-cell' id="person-cell">{associated.person}</td>
          <td className='table-cell' id="kebab-menu"></td>
        </tr>
      )
    );
  }

  return (
    <>
      <main>
        <div className = 'list-view-container'>
          <div className = 'list-table'>
            <table className = 'artefact-list'>
              <thead>
                <tr>
                  <th className="name-table">Artefact Name</th>
                  <th className="desc-table">Description</th>
                  <th className="category-table">Category</th>
                  <th className="person-table">Person Assocciated</th>
                  <th className="kebab-menu"></th>
                </tr>
              </thead>
              <tbody>{row}</tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default ListView;
