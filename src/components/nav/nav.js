import React, { Component } from 'react'
import './nav.sass'

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <div className="wrapper">
          {this.props.children}
        </div>
      </nav>
    )
  }
}
