/**
 * @fileoverview The component responsible for showing the two interactive
 *               forms of text: the feedback message and the option to change
 *               the password if forgotten
 * Uses:
 * - React for rendering HTML
 * - Iconify for adding icons
 */

/**
 * Shows the two interactive forms of text: the feedback message and the
 * option to change the password if forgotten
 * @return {React.Component}
 */
function TextInteractions({ feedbackMessage }) {
  return (
    <>
      <li>
        <p className="feedback">{feedbackMessage}</p>
      </li>
      <li className="forget-password-link">
        <h5>Forgot password?</h5>
      </li>
    </>
  );
}

export default TextInteractions;
