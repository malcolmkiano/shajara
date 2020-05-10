import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import "./app.sass";

import { LandingPage, Register, Login, Dashboard } from "../../routes";
import { PrivateRoute, PublicOnlyRoute } from "../../utils";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicOnlyRoute exact path="/" component={LandingPage} />
          <PublicOnlyRoute path="/register" component={Register} />
          <PublicOnlyRoute path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
