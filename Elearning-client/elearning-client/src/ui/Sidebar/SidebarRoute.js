import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../../shared/routes/AdminRoutes";

const SidebarRoute = () => {
  return (
    <>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Switch>
          {Array.isArray(routes) &&
            routes.map((route, i) => {
              return (
                <Route
                  path={`/secured${route.path}`}
                  key={route.title + i}
                  exact={route.path == "/" ? true : false}
                >
                  {route.component}
                </Route>
              );
            })}
        </Switch>
      </Suspense>
    </>
  );
};

export default SidebarRoute;
