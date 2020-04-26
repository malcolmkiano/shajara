import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './tab-bar.sass'

import { HomeIcon, EntriesIcon, MoodsIcon, SearchIcon, SettingsIcon } from '../../images'
const tabs = [
  { url: '/dashboard', title: 'Home', icon: HomeIcon },
  { url: '/dashboard/entries', title: 'Entries', icon: EntriesIcon },
  { url: '/dashboard/moods',  title: 'Moods', icon: MoodsIcon },
  { url: '/dashboard/search', title: 'Search', icon: SearchIcon },
  { url: '/dashboard/settings', title: 'Settings', icon: SettingsIcon }
]

class TabBar extends Component {
  render() {

    const tabButtons = tabs.map(tab => {
      const Icon = tab.icon
      if (tab.url.endsWith('/')) tab.url = tab.url.substring(0, tab.url.length - 1)
      const activeState = this.props.location === tab.url ? 'active' : ''

      return (
        <li key={tab.url}>
          <Link to={tab.url} className={activeState} onClick={this.props.onClick}>
            <Icon />
            <span>{tab.title}</span>
          </Link>
        </li>
      )
    })

    return (
      <ul className="tab-bar" role="navigation">
        {tabButtons}
      </ul>
    )
  }
}

TabBar.propTypes = {
  location: PropTypes.string
}

export default TabBar