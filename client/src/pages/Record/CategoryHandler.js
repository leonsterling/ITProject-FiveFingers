import axios from 'axios';
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const token = cookies.get("TOKEN");


async function getObject (requestURI, setCategoryList) {
    const configuration = {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
      url: `http://localhost:5100/${requestURI}`,
    };

    await axios(configuration).then((res) => {
        let data = res.data.categories;
        console.log(data);
        setCategoryList([
            "Books",
            "Sculptures",
            "Photographs",
            "Furniture",
        ]);
    }).catch((err) => {
      console.log("fail login");
      console.log(err);
    });

    return null;
}

export { getObject };

 