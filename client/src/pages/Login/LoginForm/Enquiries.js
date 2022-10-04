/**
 * @fileoverview The component responsible for asking the user to provide
 *               their respective login information for the form to handle
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 */

// Imports of packages
import { Icon } from "@iconify/react";

/**
 * Asks the user to provide their respective login information for the form
 * to handle, changing the stored information of the username and password of
 * the parent component
 * @return {React.Component}
 */
function Enquiries({ inputClass, setUserName, setPassword }) {
  return (
    <>
      <li>
        <label> Username </label>
      </li>
      <li className={inputClass}>
        <span>
          <Icon icon="codicon:mail" />
        </span>
        <input
          type="text"
          id="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
      </li>
      <li>
        <label> Password </label>
      </li>
      <li className={inputClass}>
        <span>
          <Icon icon="codicon:lock-small" />
        </span>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>
          <Icon className="password-toggle" icon="bi:eye-slash-fill" />
        </span>
      </li>
    </>
  );
}

export default Enquiries;
