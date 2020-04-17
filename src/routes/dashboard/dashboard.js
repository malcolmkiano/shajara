import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import m from 'moment'
import './dashboard.sass'

import { API, TokenService } from '../../utils'
import { Loader, TabBar } from '../../components'
import EntryForm from './entry-form'
import AppContext from './dashboard-context'
import tabs from './tabs'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: TokenService.getUserName(),
      entries: [],
      loading: true
    }
  }

  componentDidMount() {
    API.getEntries()
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

  handleEntryCreated = entry => {
    const { entries } = this.state
    entries.push(entry)

    this.setState({
      entries: entries
    })
  }

  handleEntryEdited = (id, text) => {
    const { entries } = this.state
    const index =entries.findIndex(e => e.id === id)
    entries[index].text = text

    this.setState({
      entries: entries
    })
  }

  handleEntryOpened = (id = null) => {
    const entry = id
      ? this.state.entries.find(e => e.id === id)
      : null

    const d = (entry && entry.date) || new Date()
    const date = m(d).format('YYYY-MM-DD')
    const { url } = this.props.match
    const dest = `${url}/entry/${date}`

    this.props.history.push(dest)
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
    const contextValues = {
      user_name,
      entries,
      onEntryOpen: this.handleEntryOpened,
      onCreateEntry: this.handleEntryCreated,
      onEditEntry: this.handleEntryEdited
    }

    return (
      <AppContext.Provider value={contextValues}>
        <section className={`dashboard ${loading ? 'loading' : ''}`}>

          <Route path="/dashboard/:tab*/entry/:date" component={EntryForm} />

          <Switch>
            {routes}
          </Switch>

          <Loader status={loading} />
          <TabBar tabs={tabs} location={location} onClick={this.closeEntry} />
        </section>
      </AppContext.Provider>
    )

  }
}
