import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './home.sass'

import { Entry } from '../../../../components'
import AppContext from '../../dashboard-context'

export default class Home extends Component {
  static contextType = AppContext

  componentDidMount() {
    document.title = 'Home - Shajara - Journal App'
  }

  render() {
    const { user_name, onEntryOpen, entries, match } = this.context

    // grab today's entry (if there is one)
    const m = moment()
    const entryToday = entries.filter(e => m.isSame(e.date, 'day'))[0]

    // create time-aware statement for greeting
    const time = parseInt(m.format('H'))
    const greeting = (time >= 4 && time < 12)
      ? 'The morning is the best time to write your plan or expectations for the day.'
      : (time >= 12 && time < 16)
      ? 'Do you have any reflections you want to write about this afternoon?'
      : (time >= 16 && time < 20)
      ? 'The evening is a great time to meditate and write about your reflections this day.'
      : (time >= 20 || time < 23)
      ? 'An entry before bed might be exactly what you need.'
      : 'It\'s time for a late night glass of water and some reflection.'

    // grab all other entries (except today)
    // only for the past 7 days
    const entryList = entries.filter(e => (
      !moment().isSame(e.date, 'day') &&
      !moment(e.date).isBefore(moment().subtract(7, 'days'))
      )).map(e => (
      <li key={e.id}>
        <Entry
          url={match.url + '/entry/' + e.id}
          onClick={onEntryOpen}
          content={e}/>
      </li>
    ))

    return (
      <article className="wrapper home">
        <h2>Hey {user_name},</h2>
        <p className="greeting">
          {!entryToday
            ? greeting
            : 'Pick up from where you left off:'}
        </p>

        <Entry
          url={match.url + '/entry/'}
          type="today"
          onClick={onEntryOpen}
          content={entryToday}/>

        <h4>Your Entries</h4>
        <ul>
          {entryList}
        </ul>

        <Link onClick={this.props.onLogOut} to="/login">Log Out</Link>
      </article>
    )
  }
}
