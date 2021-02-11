import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import "./login.css";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
function Login() {
  const [{}, dispatch] = useStateValue();

  const handleSignin = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
          dispatch({
              type:actionTypes.SET_USER,
              user:result.user
          })
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__text">Sign in</div>
        <Button type="Submit" onClick={handleSignin}>
          {" "}
          Signin with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
