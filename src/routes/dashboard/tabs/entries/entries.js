import React, { Component } from 'react'
import moment from 'moment'
import './entries.sass'

import { StoryImage } from '../../../../images'
import { Button, EntryList } from '../../../../components'
import { EntryService } from '../../../../utils'
import AppContext from '../../dashboard-context'

export default class Entries extends Component {
  state = {
    month: moment()
  }

  static contextType = AppContext

  isCurrentMonth() {
    return moment().isSame(this.state.month, 'month')
  }

  changeMonth(n = -1) {
    const m = moment(this.state.month).add(n, 'months')
    this.setState({
      month: m
    })
  }

  componentDidMount() {
    document.title = 'Entries - Shajara - Journal App'
  }

  render() {
    const { onEntryOpen, entries } = this.context

    // grab all the entries for the selected month
    const list = EntryService.getMonth(entries, this.state.month).map(e => {
      const entry = EntryService.makeComponent(e, onEntryOpen)
      return (<li key={e.id}>{entry}</li>)
    })

    // gets the name of the current month
    const date = this.state.month.format('MMM YYYY')

    return (
      <article className="wrapper entries">
        <div className="month-selector">
          <Button
            type="prev"
            variant="alt"
            title="Previous month"
            onClick={() => this.changeMonth()} />

          <h2>{date}</h2>

          <Button
            type="next"
            variant="alt"
            title="Next month"
            disabled={this.isCurrentMonth()}
            onClick={() => this.changeMonth(1)} />
        </div>

        <EntryList
          entries={list}
          EmptyImage={StoryImage}
          showText="No entries this month" />

      </article>
    )
  }
}
