import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import routes from "../../shared/routes/AdminRoutes";
const useStyles = makeStyles((theme) => ({
  menuLink: {
    display: "flex",
    textDecoration: "none",
  },
}));

const SidebarMenu = () => {
  const classes = useStyles();
  return (
    <>
      <List>
        {Array.isArray(routes) &&
          routes.map((route, index) => (
            <ListItem button key={route.title + index}>
              <Link to={`/secured${route.path}`} className={classes.menuLink}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.title} />
              </Link>
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default SidebarMenu;
