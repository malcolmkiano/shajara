import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './dashboard.sass'

import { API, TokenService } from '../../utils'
import { Loader, TabBar, Popup } from '../../components'
import AppContext from './dashboard-context'
import tabs, { Home, Entries, Moods, Search, Settings, EntryForm } from './tabs'

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

  getEntries = () => {
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

  componentDidMount() {
    this.getEntries()
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
    
    // set up the context values
    const location = this.props.location.pathname
    const { user_name, entries, loading, message, error } = this.state
    const contextValues = {
      user_name,
      entries,
      error,
      onCreateEntry: this.handleEntryCreated,
      onEditEntry: this.handleEntryEdited,
      onLogOut: this.handleLogOut
    }

    return (
      <AppContext.Provider value={contextValues}>
        <section className={`dashboard ${loading ? 'loading' : ''}`}>

          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route path="/dashboard/entries" component={Entries} />
            <Route path="/dashboard/moods" component={Moods} />
            <Route path="/dashboard/search" component={Search} />
            <Route path="/dashboard/settings" component={Settings} />
            <Route path="/dashboard/entry/:date" render={props => (
              <EntryForm {...props} entries={entries} />
            )} />
          </Switch>

          <Popup
            message={message}
            isError={error}
            autoDismiss={!error}
            onDismiss={message === 'Could not log you in' ? this.handleLogOut : this.clearMessage} />

          <Loader status={loading} />
          <TabBar tabs={tabs.filter(tab => !tab.hide)} location={location} onClick={this.closeEntry} />
        </section>
      </AppContext.Provider>
    )

  }
}
