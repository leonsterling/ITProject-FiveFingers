import axios from 'axios';

async function getObject (requestURI) {
    const configuration = {
      method: "get",
      url: `http://localhost:5100/${requestURI}`,
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

