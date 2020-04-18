import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './tab-bar.sass'

export default class TabBar extends Component {
  render() {
    const { tabs } = this.props

    const tabButtons = tabs.map(tab => {
      const Icon = tab.icon
      if (tab.route.endsWith('/')) tab.route = tab.route.substring(0, tab.route.length - 1)
      const activeState = this.props.location === tab.route ? 'active' : ''

      return (
        <li key={tab.route}>
          <Link to={tab.route} className={activeState} onClick={this.props.onClick}>
            <Icon />
            <span className="media-tablet">{tab.title}</span>
          </Link>
        </li>
      )
    })

    return (
      <ul className="tab-bar">
        {tabButtons}
      </ul>
    )
  }
}