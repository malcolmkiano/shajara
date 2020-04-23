import React, { Component } from 'react'
import './moods.sass'

import { EntryService, ChartService } from '../../../../utils'
import AppContext from '../../dashboard-context'

class Moods extends Component {
  static contextType = AppContext

  state = {
    view: 'week' // week | month | year | all
  }

  componentDidMount() {
    document.title = 'Moods - Shajara - Journal App'
  }

  handleViewChanged = e => {
    const view = e.target.value
    this.setState({ view: view })
  }

  render() {
    const { entries } = this.context
    const { view } = this.state

    const options = ['week', 'month', 'year', 'all']
    const viewOptions = options.map(option => (
      <div className="view-option" key={option}>
        <input
          type="radio"
          id={`view-${option}`}
          name="view"
          value={option}
          checked={view === option}
          onChange={this.handleViewChanged} />
        <label htmlFor={`view-${option}`}>{option}</label>
      </div>
    ))

    // add only entries in selected scope to list
    let list = EntryService.sort(entries)
    if (view === 'week') {
      list = EntryService.getWeek(entries)
    } else if (view === 'month') {
      list = EntryService.getMonth(entries)
    } else if (view === 'year') {
      list = EntryService.getYear(entries)
    }

    const lineChart = ChartService.makeChart(list)
    const pieChart = ChartService.makeChart(list, 'pie')

    return (
      <article className="wrapper moods">
        <h2>Moods</h2>
        <div className="views">
          {viewOptions}
        </div>

        <div className="charts">
          <div className="chart line">{lineChart}</div>
          <div className="chart pie">{pieChart}</div>
        </div>
      </article>
    )
  }
}

export default Moods