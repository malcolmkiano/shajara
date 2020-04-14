import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './dashboard.sass'

import { TokenService } from '../../utils'

export default class Dashboard extends Component {
  handleLogOut = () => {
    TokenService.clearAuthToken()
  }

  render() {
    return (
      <section className="dashboard">
        <div className="wrapper">
          <h2>Dashboard</h2>
          <p>Insert your app here.</p>
          <Link onClick={this.handleLogOut} to="/">Log Out</Link>
        </div>
      </section>
    )
  }
}
