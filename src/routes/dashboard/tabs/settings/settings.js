import React, { Component } from 'react'
import './settings.sass'

import { ColorService } from '../../../../utils'
import { Button } from '../../../../components'
import AppContext from '../../dashboard-context'

class Settings extends Component {
  static contextType = AppContext

  componentDidMount() {
    document.title = 'Settings - Shajara - Journal App'
  }

  handleThemeChange = e => {
    const darkMode = e.target.checked
    this.context.onThemeChanged(darkMode)
  }

  render() {
    const { theme } = this.context
    const isDarkMode = (theme && theme.colorBackground === ColorService.defaults.darkMode.colorBackground)

    return (
      <article className="wrapper settings">
        <h2>Settings</h2>
        <ul className="setting-list">
          <li>
            <input
              type="checkbox"
              id="darkmode"
              checked={isDarkMode}
              onChange={this.handleThemeChange} />
            <label htmlFor="darkmode">Dark mode</label>
          </li>
        </ul>

        <Button type="fill" variant="alt" onClick={this.context.onLogOut}>
          Log Out
        </Button>

        <hr></hr>

        <h5 className="centered">Credits</h5>
        <ul className="credits">
          <li>
            Mood icons by <a target="_blank" rel="noreferrer noopener" href="https://www.flaticon.com/authors/alfredo-hernandez" title="Alfredo Hernandez on Flaticon">Alfredo Hernandez</a>
          </li>
          <li>
            Tab icons by <a target="_blank" rel="noreferrer noopener" href="https://www.flaticon.com/authors/prosymbols" title="Prosymbols on Flaticon">Prosymbols</a>
          </li>
          <li>
            Illustrations by <a target="_blank" rel="noreferrer noopener" href="https://jamesdaly.me" title="James Daly">James Daly</a>
          </li>
        </ul>
      </article>
    )
  }
}

export default Settings