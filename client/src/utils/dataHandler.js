import axios from "axios";
import Cookies from "universal-cookie";

// obtain token from cookie
const cookies = new Cookies();
const /** ?string */ token = cookies.get("TOKEN");

/* Uncomment/comment-out whichever variables are needed for
 * different modes */
/* ------------------------------------------------------------
 * For dev-mode
 * ------------------------------------------------------------ */
 // const HOST = "http://localhost";
 // const PORT = 5100;
 // const URL = `${HOST}:${PORT}`;


/* ------------------------------------------------------------
 * For deployment-mode
 * ------------------------------------------------------------ */

const URL = `https://sterlingfamilyartefacts.herokuapp.com`;

/* ------------------------------------------------------------
 * At ${URL}/login
 * ------------------------------------------------------------ */
/**
 * Requests the server-side to check the provided credentials
 * and responds in the client-side accordingly
 * @param username the username provided by the user in the
 *                 loginpage
 * @param password the password provided by the user in the
 *                 loginpage
 */
export async function getLoginPromise (username, password) {
  return setupPromise(/* configuration = */ {
    method: "post",
    url: `${URL}/login`,
    data: {
      username,
      password,
    },
  });
}

/* ------------------------------------------------------------
 * At ${URL}/dashboard
 * ------------------------------------------------------------ */
export async function getInitDashboardPromise () {
  return setupPromise(/* configuration = */ {
      method: "get",
      url: `${URL}/data`,
      headers: {
        // authorized route with jwt token
        Authorization: `Bearer ${token}`, 
      },
    });
}

export async function getPagePromise (pageNum) {
  return setupPromise(/* configuration = */ {
      method: "get",
      url: `${URL}/data/${pageNum}`,
      headers: {
        // authorized route with jwt token
        Authorization: `Bearer ${token}`, 
      },
    });
}

export async function getSearchPromise (searchText) {
  return setupPromise(/* configuration = */ {
      method: "get",
      url: `${URL}/search-artefacts/${searchText}`,
      headers: {
        // authorized route with jwt token
        Authorization: `Bearer ${token}`,
      },
    });
}

export async function getSearchCategoryPromise (searchText, pageNum) {
  return setupPromise(/* configuration = */ {
      method: "get",
      url: `${URL}/search-category/${searchText}/${pageNum}`,
      headers: {
        // authorized route with jwt token
        Authorization: `Bearer ${token}`,
      },
    });
}

export async function getSearchAssociatedPromise (searchText, pageNum) {
  return setupPromise(/* configuration = */ {
      method: "get",
      url: `${URL}/search-associated/${searchText}/${pageNum}`,
      headers: {
        // authorized route with jwt token
        Authorization: `Bearer ${token}`,
      },
    });
}

/* ------------------------------------------------------------
 * At ${URL}/add-artefact
 * ------------------------------------------------------------ */
export async function postArtefact (record) {
  return setupPromise(/* configuration = */ {
    method: "post",
    url: `${URL}/add-artefact`,
    data: {
      record,
    },
    headers: {
      // authorized route with jwt token
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getCategoryPromise (requestURI) {
  return setupPromise(/* configuration = */ {
    method: "get",
    headers: {
      // authorized route with jwt token
      Authorization: `Bearer ${token}`,
    },
    url: `${URL}/${requestURI}`,
  });
}

/* ------------------------------------------------------------
 * At ${URL}/full-view
 * ------------------------------------------------------------ */
export async function getFullViewPromise (id) {
  return setupPromise(/* configuration = */ {
    method: "get",
    url: `${URL}/get-artefact/${id}`,
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  });
}

/* ------------------------------------------------------------
 * At ${URL}/edit-page
 * ------------------------------------------------------------ */
export async function updateArtefact(id,record) {
  // set configurations
  const configuration = {
    method: "patch",
    url: `${URL}/edit-artefact/${id}`,
    data: {
      record,
    },
    headers: {
      Authorization: `Bearer ${token}`, // authorized route with jwt token
    },
  };

}

/* ------------------------------------------------------------
 * Helper function
 * ------------------------------------------------------------ */
async function setupPromise (configuration) {
  return await axios(configuration);
}

