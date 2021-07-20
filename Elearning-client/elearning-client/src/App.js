import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import AuthService from "./services/AuthService";
import { selectUser, addUser } from "./slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import FullLayout from "./layouts/full/FullLayout";
import BlankLayout from "./layouts/blank/BlankLayout";
function App() {
  const SecuredRoute = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userObj = useSelector(selectUser);
    const [isAuthenticated, setAuthenticated] = useState(true);
    useEffect(() => {
      if (!sessionStorage.getItem("token")) setAuthenticated(false);
      else
        AuthService.refreshToken()
          .then((res) => {
            console.log("user-", res.data);
            sessionStorage.setItem("token", res.headers["x-token"]);
            dispatch(addUser(res.data.data));
          })
          .catch((err) => {
            history.push("/login");
          });
    }, []);

    if (isAuthenticated) {
      return <Route path={props.path}>{props.children}</Route>;
    } else {
      return <Redirect to="/" />;
    }
  };
  return (
    <>
      <Switch>
        <SecuredRoute path="/secured">
          <FullLayout />
        </SecuredRoute>
        <Route path="/">
          <BlankLayout />
        </Route>
      </Switch>
    </>
  );
}

export default App;
