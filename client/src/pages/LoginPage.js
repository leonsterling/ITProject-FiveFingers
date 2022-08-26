// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

// MUI imports
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Axios imports
import axios from "axios";

// CSS imports
import classes from "./LoginPage.css";

const theme = createTheme();

const states = {
  initial: { borderBottom: "1px solid grey" },
  invalid: { borderBottom: "1px solid red" },
  valid: { borderBottom: "1px solid green" },
};

function LoginPage() {
  const navigate = useNavigate();
  let [state, setState] = useState({
    currentState: states.initial,
    isValid: false,
  });

  async function handleSubmit(e) {
    // set configurations
    const data = new FormData(e.currentTarget);
    const username = data.get("email");
    const password = data.get("password");
    const configuration = {
      method: "post",
      url: "http://localhost:5000/login",
      data: {
        username,
        password,
      },
    };

    // prevent the form from refreshing the whole page
    e.preventDefault();

    // make the API call
    await axios(configuration)
      .then((res) => {
        let inputClass = res.data.isValid ? states.valid : states.invalid;
        setState({
          currentState: inputClass,
          isValid: res.data.isValid,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (state.isValid) {
    navigate("/dashboard");
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email address"
                name="email"
                sx={state.currentState}
                autoComplete="email"
                autoFocus
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter your password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant="standard"
                sx={state.currentState}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className={classes.Button}
              >
                Sign In
              </Button>
              <Grid container spacing={2}>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                  <Link to="/forgotpassword">Forgot Password</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;

