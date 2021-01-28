import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import Context from "./context";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    state: { currentUser },
  } = useContext(Context);
  return currentUser ? (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
