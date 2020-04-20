import React, { Component } from 'react'
import './settings.sass'

import { Button } from '../../../../components'
import AppContext from '../../dashboard-context'

export default class Settings extends Component {
  static contextType = AppContext

  componentDidMount() {
    document.title = 'Settings - Shajara - Journal App'
  }

  render() {
    return (
      <article className="wrapper settings centered">
        <h2>Settings</h2>
        <p>Cool options coming soon!</p>
        <Button type="fill" variant="alt" onClick={this.context.onLogOut}>
          Log Out
        </Button>
      </article>
    )
  }
}
