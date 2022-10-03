import { Icon } from "@iconify/react";

function Enquiries ( { inputClass, setUserName, setPassword } ) {
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
    )
}

export default Enquiries;

