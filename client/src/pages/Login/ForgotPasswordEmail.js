import React from 'react';
import { Link } from "react-router-dom";

// Import CSS
import "./ForgotPasswordEmail.css";

function ForgetsPage() {
  return (
    <main>
      <header className={classes.Title}> Forgot Password?</header>
      <Typography>
        Enter the email associated with your account and we'll send you a link
        to reset your password
      </Typography>

    
      <TextField
        id="input-with-icon-textfield"
        label="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailOutlinedIcon/>
            </InputAdornment>
          ),
        }}
        variant="standard"
      />

      <div>
        <button className={classes.reset}>Reset Password</button>
      </div>
      <Grid item xs>
        <Link to="/login">Back to log in</Link>
      </Grid>
    </main>
  );
}

export default ForgetsPage;
