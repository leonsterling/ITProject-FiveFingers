import axios from "axios";

const URI = "http://localhost:5100"

/**
 * Requests the server-side to check the provided credentials and responds
 * in the client-side accordingly
 * @param username the username provided by the user in the loginpage
 * @param password the password provided by the user in the loginpage
 */
export async function getLoginPromise (username, password) {
  /** {{
   *     method: string,
   *     url: string,
   *     data: {{
   *        username: string,
   *        password: string
   *     }}
   *  }} */
  return setupPromise(/* configuration = */ {
    method: "post",
    url: `${URI}/login`,
    data: {
      username,
      password,
    },
  });
}

async function setupPromise (configuration) {
  return await axios(configuration);
}

