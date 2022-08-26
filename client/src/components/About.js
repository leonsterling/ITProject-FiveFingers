import React, { useEffect, useState } from "react";
import axios from "axios";

// dummy About page
export default function About() {
  
  const [message, setMessage] = useState("");

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:5000/about",
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <div>
      <h1>About Page!</h1>
      <h3>{message}</h3>
    </div>
  );
}
