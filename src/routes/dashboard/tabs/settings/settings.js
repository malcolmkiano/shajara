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

  handleAccentChange = e => {
    const color = e.target.value
    this.context.onAccentChanged(color)
  }

  render() {
    const { theme, accent } = this.context
    const isDarkMode = (theme && theme.colorBackground === ColorService.defaults.darkMode.colorBackground)

    const colors = ['#FEB931', '#EE6352', '#59CD90']
    const colorDots = colors.map((color, index) => (
      <span key={`color-${index}`}>
        <input
          type="radio"
          name="accent"
          value={color}
          onChange={this.handleAccentChange}
          checked={color === accent}
          id={`color-${index}`} />
        <label htmlFor={`color-${index}`}>
          <span style={{background: color}}/>
        </label>
      </span>
    ))

    return (
      <article className="wrapper settings">
        <h2>Settings</h2>
        <ul className="setting-list">
          <li>
            <input
              type="checkbox"
              id="darkmode"
              name="darkmode"
              checked={isDarkMode}
              onChange={this.handleThemeChange} />
            <label htmlFor="darkmode">Dark mode</label>
          </li>
          <li className="color-picker">
            <p>Theme</p>
            <div className="colors">
              {colorDots}
            </div>
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