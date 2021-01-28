import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Login from "../components/Auth/Login";
import Context from "../context";

const Splash = () => {
  const {
    state: { currentUser },
  } = useContext(Context);
  return currentUser ? <Redirect to="/" /> : <Login />;
};

export default Splash;
