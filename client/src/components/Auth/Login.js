import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { GraphQLClient } from "graphql-request";
import { GoogleLogin } from "react-google-login";
import Context from "../../context";
import { ME_QUERY } from "../../graphql/queries";
// import Typography from "@material-ui/core/Typography";

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async (googleUser) => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient("http://localhost:4000/graphql", {
        headers: { authorization: idToken },
      });
      const data = await client.request(ME_QUERY);

      dispatch({
        type: "LOGIN_USER",
        payload: data.me,
      });
    } catch (error) {
      onFailure(error);
    }
  };

  const onFailure = (error) => {
    console.log("Error while logging in", error);
  };

  return (
    <div className={classes.root}>
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
        onSuccess={onSuccess}
        isSignedIn
        onFailure={onFailure}
        theme="dark"
        buttonText="Login with Google"
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default withStyles(styles)(Login);
