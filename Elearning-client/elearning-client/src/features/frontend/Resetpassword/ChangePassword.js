import React, { useState, useEffect } from "react";
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
import { useHistory, useParams } from "react-router-dom";
import API from "../../../api/API";
import swal from "sweetalert2";
import UserService from "../../../services/UserService";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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

const ChangePassword = () => {
  const classes = useStyles();
  const { token } = useParams();
  const [user, setUser] = useState({});
  const history = useHistory();
  const [data, setData] = useState({
    password: "",
    cnfPassword: "",
  });

  const [errors, setErrors] = useState({
    isError: true,
    errorMessage: "",
  });
  const invalidToken = () => {
    swal.fire(
      "Oops...",
      "Link Is Not Valid , You will redirect to reset link page",
      "error"
    );
  };
  useEffect(() => {
    console.log(token);
    if (!token) {
      invalidToken();
      setTimeout(() => {
        history.push("/resetLink");
      }, 3000);
    } else {
      API.interceptors.request.use((config) => {
        config.headers.authorization = token;
        return config;
      });
      AuthService.refreshToken()
        .then((response) => {
          console.log(response);
          setUser(response.data.data);
        })
        .catch((err) => {
          console.log(err);
          invalidToken();
          setTimeout(() => {
            history.push("/resetLink");
          }, 3000);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    isPasswordMatched();
  }, [data.cnfPassword, data.password]);

  const isPasswordMatched = () => {
    if (data.password == "" && data.cnfPassword == "") {
      setErrors({
        ...errors,
        ["isError"]: true,
        ["errorMessage"]: "",
      });
    } else if (data.password != data.cnfPassword) {
      setErrors({
        ...errors,
        ["isError"]: true,
        ["errorMessage"]: "Password does not matched",
      });
    } else {
      setErrors({
        ...errors,
        ["isError"]: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.updateUser({ password: data.password }, user._id)
      .then((res) => {
        sessionStorage.removeItem("token");
        swal.fire(
          "Success",
          "Password Updated Successfully . You will redirect to login page",
          "success"
        );
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        swal.fire("Oops...", "Could Not Change Password", "error");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cnfPassword"
            label="Confirm Password"
            type="password"
            id="cnfpassword"
            onChange={handleChange}
            value={data.cnfPassword}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            disabled={errors.isError}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Change Password
          </Button>
          {errors.isError && errors.errorMessage && (
            <Alert variant="filled" severity="error">
              {errors.errorMessage}
            </Alert>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default ChangePassword;
