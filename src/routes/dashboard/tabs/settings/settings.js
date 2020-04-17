import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './settings.sass'

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
        <Link onClick={this.props.onLogOut} to="/login">Log Out</Link>
      </article>
    )
  }
}
