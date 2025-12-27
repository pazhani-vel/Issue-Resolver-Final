import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authStates } from "./auth";

const ProtectedRoute = ({
  component: Component,
  authState,
  redirectPath,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authState === authStates.LOGGED_IN ? (
          <Component {...props} />
        ) : authState === authStates.INITIAL_VALUE ? (
          <div>Loading...</div>
        ) : (
          <Redirect to={redirectPath} />
        )
      }
    />
  );
};

export default ProtectedRoute;
