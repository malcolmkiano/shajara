import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './app.sass'

import { LandingPage } from '../../routes'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={LandingPage} />
      </Switch>
    )
  }
}
