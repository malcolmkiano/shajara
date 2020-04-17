import React, { Component } from 'react'
import moment from 'moment'
import './home.sass'

import { WriteImage } from '../../../../images'
import { EntryList } from '../../../../components'
import { EntryService } from '../../../../utils'
import AppContext from '../../dashboard-context'

export default class Home extends Component {
  static contextType = AppContext

  componentDidMount() {
    document.title = 'Home - Shajara - Journal App'
  }

  generateGreeting() {
    const time = parseInt(moment().format('H'))
    return (time >= 4 && time < 12)
      ? 'The morning is the best time to write your plan or expectations for the day.'
      : (time >= 12 && time < 16)
        ? 'Have any reflections you want to write about this afternoon?'
        : (time >= 16 && time < 20)
          ? 'The evening is a great time to meditate and write about your reflections this day.'
          : (time >= 20 || time < 23)
            ? 'An entry before bed might be exactly what you need.'
            : 'It\'s time for a late night glass of water and some reflection.'
  }

  render() {
    const { user_name, onEntryOpen, entries } = this.context

    // grab today's entry (if there is one)
    const entryToday = EntryService.getToday(entries)

    // create time-aware statement for greeting
    const greeting = this.generateGreeting()

    // grab all other entries (except today)
    // only for the past 7 days
    const list = EntryService.getNotToday(entries).map(e => {
      const entry = EntryService.makeComponent(e, onEntryOpen)
      return (
        <li key={e.id}>
          {entry}
        </li>
      )
    })

    // today's entry component
    const entry = EntryService.makeComponent(entryToday, onEntryOpen, true, !list.length)

    return (
      <article className="wrapper home">
        <h2>Hey {user_name},</h2>
        <p className="greeting">
          {!entryToday
            ? greeting
            : 'Pick up from where you left off:'}
        </p>

        {entry}

        <EntryList
          title="Your Entries"
          entries={list}
          EmptyImage={WriteImage}
          showText="You haven't made any entries yet" />

      </article>
    )
  }
}
