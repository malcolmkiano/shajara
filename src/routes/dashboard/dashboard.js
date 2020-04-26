import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags'
import { Switch, Route } from 'react-router-dom'
import './dashboard.sass'

import { API, TokenService, ColorService } from '../../utils'
import { Loader, TabBar, Popup } from '../../components'
import { Home, Entries, Moods, Search, Settings, EntryForm } from './tabs'

import AppContext from './dashboard-context'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: TokenService.getUserName(),
      entries: [],
      loading: true,

      theme: ColorService.getTheme(),
      accent: ColorService.getAccent(),

      message: null,
      error: false
    }
  }

  getEntries = () => {
    API.getEntries()
      .then(data => {
        this.setState({
          entries: data.map(entry => {
            // allow for display of these characters without
            // performing any unsafe actions (these would've been placed by XSS)
            entry.content = entry.content
              .replace(/(&lt;)/g, '<')
              .replace(/(&gt;)/g, '>')
            return entry
          }),
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
        console.log(newEntry)
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
      .then(updatedEntry => {
        const { entries } = this.state
        const index = entries.findIndex(e => e.id === id)
        entries[index] = updatedEntry

        let message = 'Entry saved successfully'
        if (entry.content !== updatedEntry.content) {
          message = 'Unsafe content was filtered out'
        }

        this.setState({
          entries: entries,
          message: message,
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

  handleThemeChanged = isDarkMode => {
    let theme = ColorService.defaults.lightMode
    if (isDarkMode) theme = ColorService.defaults.darkMode

    this.setState({
      theme: theme
    }, () => ColorService.saveTheme(theme))
  }

  handleAccentChanged = color => {
    this.setState({
      accent: color
    }, () => ColorService.saveAccent(color))
  }

  handleLogOut = () => {
    TokenService.clearAuthToken()
    this.props.history.push('/')
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
    const { user_name, entries, loading, message, error, theme, accent } = this.state
    const contextValues = {
      user_name,
      entries,
      error,
      theme,
      accent,
      onCreateEntry: this.handleEntryCreated,
      onEditEntry: this.handleEntryEdited,
      onThemeChanged: this.handleThemeChanged,
      onAccentChanged: this.handleAccentChanged,
      onLogOut: this.handleLogOut
    }

    const colorVars = {}
    Object.entries(theme).forEach(([varName, value]) => {
      colorVars[`--${varName}`] = value
    })

    // add accent
    colorVars['--colorAccent'] = accent

    // check if in dark mode
    const isDarkMode = (theme.colorBackground === ColorService.defaults.darkMode.colorBackground)

    // force log out?
    const forceLogOut = message === 'Could not log you in'
      || message === 'Failed to fetch'

    return (
      <AppContext.Provider value={contextValues}>

        <MetaTags>
          <meta name="theme-color" content={accent} />
          <meta name="apple-mobile-web-app-status-bar-style" content={isDarkMode ? 'black-translucent' : 'default'} />
        </MetaTags>

        <section
          className={`dashboard ${loading ? 'loading' : ''}`}
          style={colorVars} >

          <div className="dashboard-content">
            <Switch>
              <Route exact path="/dashboard" component={Home} />
              <Route path="/dashboard/entries" component={Entries} />
              <Route path="/dashboard/settings" component={Settings} />
              <Route path="/dashboard/moods" component={Moods} />
              <Route path="/dashboard/search/:query?" component={Search} />
              <Route path="/dashboard/entry/:date" render={props => (
                <EntryForm
                  {...props}
                  entries={entries}
                  update={message === 'Unsafe content was filtered out'} />
              )} />
            </Switch>
          </div>

          <Popup
            message={message}
            isError={error}
            autoDismiss={!error}
            onDismiss={forceLogOut ? this.handleLogOut : this.clearMessage} />

          <Loader status={loading} />
          <TabBar location={location} />
        </section>
      </AppContext.Provider>
    )

  }
}

Dashboard.propTypes = {
  location: PropTypes.object.isRequired
}

export default Dashboard