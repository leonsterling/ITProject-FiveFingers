import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import classes from "./ForgotPassword.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

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
