import axios from 'axios';
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");

async function getPicture (requestURI) {
    const configuration = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
      url: `http://localhost:5100/add-artefact/${requestURI}`,
    };

    await axios(configuration).then((res) => {
        return res.data;
    }).catch((err) => {
      console.log("fail login");
      console.log(err);
    });

    return null;
}




export { getPicture };