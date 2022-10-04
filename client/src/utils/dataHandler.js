import axios from "axios";
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const /** ?string */ token = cookies.get("TOKEN");

const HOST = "http://localhost";
const PORT = 5100;

/* ------------------------------------------------------------
 * At ${HOST}:${PORT}/login
 * ------------------------------------------------------------ */
/**
 * Requests the server-side to check the provided credentials and responds
 * in the client-side accordingly
 * @param username the username provided by the user in the loginpage
 * @param password the password provided by the user in the loginpage
 */
export async function getLoginPromise (username, password) {
  return setupPromise(/* configuration = */ {
    method: "post",
    url: `${HOST}/login`,
    data: {
      username,
      password,
    },
  });
}

/* ------------------------------------------------------------
 * At ${HOST}:${PORT}/dashboard
 * ------------------------------------------------------------ */
export async function getInitDashboardPromise () {
  return setupPromise(/* configuration = */ {
      method: "get",
      url: `${HOST}:${PORT}/data`,
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
    });
}

export async function getSearchPromise (searchText) {
  return setupPromise(/* configuration = */ {
      method: "get",
      url: `${HOST}:${PORT}/search-artefacts/${searchText}`,
      headers: {
        Authorization: `Bearer ${token}`, // authorized route with jwt token
      },
    });
}

/* ------------------------------------------------------------
 * At ${HOST}:${PORT}/add-artefact
 * ------------------------------------------------------------ */
export async function postArtefact (record) {
  return setupPromise(/* configuration = */ {
    method: "post",
    url: `${HOST}:${PORT}/add-artefact`,
    data: {
      record,
    },
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  });
}

export async function getCategoryPromise (requestURI) {
  return setupPromise(/* configuration = */ {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
    url: `${HOST}:${PORT}/${requestURI}`,
  });
}

/* ------------------------------------------------------------
 * Helper function
 * ------------------------------------------------------------ */
async function setupPromise (configuration) {
  return await axios(configuration);
}

