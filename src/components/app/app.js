import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import './app.sass'

import { LandingPage, Register, Login, Dashboard } from '../../routes'
import { PrivateRoute, PublicOnlyRoute } from '../../utils'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <PublicOnlyRoute exact path="/" component={LandingPage} />
        <PublicOnlyRoute path="/register" component={Register} />
        <PublicOnlyRoute path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    )
  }
}
