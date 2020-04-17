import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
      <article className="wrapper settings">
        <h2>Settings</h2>
        <p className="centered">Cool options coming soon!</p>
        <Button type="fill" variant="alt" hasLink={true}>
          <Link onClick={this.props.onLogOut} to="/login">Log Out</Link>
        </Button>
      </article>
    )
  }
}
