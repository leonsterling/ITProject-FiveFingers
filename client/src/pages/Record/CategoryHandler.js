import axios from 'axios';
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

async function getObject (requestURI) {
    const configuration = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
      url: `https://sterlingfamilyartefacts.herokuapp.com/add-artefact/${requestURI}`,
    };

    await axios(configuration).then((res) => {
        return res.data;
    }).catch((err) => {
      console.log("fail login");
      console.log(err);
    });

    return null;
}

export { getObject };

