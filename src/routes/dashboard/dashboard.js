import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './dashboard.sass'

import { API, TokenService } from '../../utils'
import { Loader, TabBar } from '../../components'
import AppContext from './dashboard-context'
import tabs from './tabs'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: TokenService.getUserName(),
      token: TokenService.getAuthToken(),
      entries: [],
      loading: true
    }
  }

  componentDidMount() {
    API.getEntries(this.state.token)
      .then(data => {
        this.setState({
          entries: data,
          loading: false
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleLogOut = () => {
    TokenService.clearAuthToken()
  }

  render() {

    // set up the different routes
    const location = this.props.location.pathname
    const routes = tabs.map(tab => {
      const Child = tab.component
      return (
        <Route key={tab.route} exact={!!tab.exact} path={tab.route}>
          <Child onLogOut={this.handleLogOut} />
        </Route>
      )
    })

    // set up the context values
    const { user_name, entries, loading } = this.state
    const contextValues = { user_name, entries }

    return (
      <AppContext.Provider value={contextValues}>
        <section className="dashboard">
          <Switch>
            {routes}
          </Switch>

          <Loader status={loading} />
          <TabBar tabs={tabs} location={location} />
        </section>
      </AppContext.Provider>
    )

  }
}
