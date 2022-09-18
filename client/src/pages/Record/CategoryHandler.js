import axios from 'axios';

async function getObject (requestURI) {
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

export { getObject };

