import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../stylesheets/Auth.css";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Reset from "./Reset.js";
import NewPassword from "./NewPassword.js";
import Verify from "./Verify";

export default function Auth() {
  return (
    <Router>
      <Switch>
        <Route path="/auth/signup">
          <Signup />
        </Route>
        <Route path="/auth/verify">
          <Verify />
        </Route>
        <Route path="/auth/reset">
          <Reset />
        </Route>
        <Route path="/auth/new-password/:credential">
          <NewPassword />
        </Route>
        <Route path="/auth">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
