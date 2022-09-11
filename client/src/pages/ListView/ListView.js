import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

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
        setList(response.data);
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
        <tr key={_id}>
          <td>{artefactName}</td>
          <td>{description.substring(0, 10)}</td>
          <td>{associated}</td>
          <td>{category}</td>
          <td>
            <Link to={`/${_id}`} >
              View
            </Link>
          </td>
          <td>
            <Link to={`/${_id}/edit`} >
              Edit
            </Link>
          </td>
          <td>
            <Link to={`/${_id}`} >
              Delete
            </Link>
          </td>
        </tr>
      )
    );
  }

  return (
    <>
      <div>
        <div>
          <h2>List View</h2>
          <hr />
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>ArtefactName</th>
                <th>Description</th>
                <th>Person</th>
                <th>Category</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{row}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListView;
