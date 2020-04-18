import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './dashboard.sass'

import { API, TokenService } from '../../utils'
import { Loader, TabBar, Popup } from '../../components'
import EntryForm from './entry-form'
import AppContext from './dashboard-context'
import tabs from './tabs'

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: TokenService.getUserName(),
      entries: [],
      loading: true,

      message: null,
      error: false
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

        let message = err.message
        if (err.code === 401) message = 'Could not log you in'

        this.setState({
          message: message,
          error: true
        })
      })
  }

  handleEntryCreated = entry => {
    API.createEntry(entry)
      .then(newEntry => {
        const { entries } = this.state
        entries.push(newEntry)

        this.setState({
          entries: entries,
          message: 'Entry saved successfully',
          error: false
        })
      })
      .catch(err => {
        this.setState({
          message: err.message,
          error: true
        })
      })
  }

  handleEntryEdited = (id, entry) => {
    API.updateEntry(id, entry)
      .then(() => {
        const { entries } = this.state
        const index = entries.findIndex(e => e.id === id)
        entries[index] = entry

        this.setState({
          entries: entries,
          message: 'Entry saved successfully',
          error: false
        })
      })
      .catch(err => {
        this.setState({
          message: err.message,
          error: true
        })
      })
  }

  handleLogOut = () => {
    TokenService.clearAuthToken()
    window.location.reload()
  }

  clearMessage = () => {
    this.setState({
      message: null,
      isError: false
    })
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
    const { user_name, entries, loading, message, error } = this.state
    const contextValues = {
      user_name,
      entries
    }

    return (
      <AppContext.Provider value={contextValues}>
        <section className={`dashboard ${loading ? 'loading' : ''}`}>

          <Switch>
            {routes}
            <Route path="/dashboard/entry/:date" component={props => (
              <EntryForm
                {...props}
                onCreateEntry={this.handleEntryCreated}
                onEditEntry={this.handleEntryEdited} />
            )} />
          </Switch>

          <Popup
            message={message}
            isError={error}
            autoDismiss={!error}
            onDismiss={message === 'Could not log you in' ? this.handleLogOut : this.clearMessage} />

          <Loader status={loading} />
          <TabBar tabs={tabs} location={location} onClick={this.closeEntry} />
        </section>
      </AppContext.Provider>
    )

  }
}
