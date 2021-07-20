import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AuthService from "../../../services/AuthService";
import Alert from "@material-ui/lab/Alert";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Find Hospital
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ResetLink = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    email: "",
    isLinkSended: false,
    isError: false,
    errorMessage: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.passwordResetLink(data)
      .then((res) => {
        //console.log(res);
        setData({ ...data, ["isLinkSended"]: true, ["isError"]: false });
      })
      .catch((err) => {
        console.log(err);
        let message = err.response.data
          ? err.response.data.message
          : "Invalid Email";
        setData({
          ...data,
          ["isError"]: true,
          ["errorMessage"]: message,
          ["isLinkSended"]: false,
        });

        setTimeout(() => {
          setData({ ...data, ["isError"]: false });
        }, 4000);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h3" variant="h5">
          {data.isLinkSended
            ? "Password Reset Link Send Successfully To Your Email Address"
            : "Enter email to get reset link."}
        </Typography>
        {!data.isLinkSended && (
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={data.email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Reset Password
            </Button>
            {data.isError && (
              <Alert variant="filled" severity="error">
                {data.errorMessage}
              </Alert>
            )}
          </form>
        )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ResetLink;
