import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../stylesheets/Auth.css";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Reset from "./Reset.js";
import NewPassword from "./NewPassword.js";
import Verify from "./Verify";

export default function Auth() {
  const [code, setCode] = useState();

  return (
    <Router>
      <Switch>
        <Route path="/auth/signup">
          <Signup setCode={setCode} />
        </Route>
        <Route path="/auth/verify">
          <Verify serverCode={code} />
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
