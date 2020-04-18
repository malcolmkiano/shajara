import React, { Component } from 'react'
import { Prompt } from 'react-router-dom'
import m from 'moment'
import './entry-form.sass'

import { Button } from '../../../components'
import AppContext from '../dashboard-context'

export default class EntryForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      entry: {
        date_created: new Date().toISOString(),
        content: '',
        id: null,
      },
      saved: true
    }
  }

  static contextType = AppContext

  componentDidMount() {
    const { entries } = this.context
    const d = this.props.match.params.date
    const isToday = m().isSame(d, 'day')
    let title = isToday ? 'Today' : m(d).format('dddd')
    document.title = `${title} - Shajara - Journal App`

    let entry = entries.find(e => m(e.date_created).isSame(d, 'day'))
    if (!entry) entry = {
      date_created: new Date().toISOString(),
      content: '',
      id: null,
    }

    this.setState({
      entry: entry
    })    
  }

  handleSave = e => {
    e.preventDefault()
    const { entry } = this.state
    if (entry.id) {
      // if there is an ID in the state,
      // entry already exists on server and needs to be updated
      this.props.onEditEntry(entry.id, entry)
    } else {
      // otherwise, create a new entry
      this.props.onCreateEntry(entry)
    }
  }

  handleUpdate = e => {
    const content = e.target.value
    if (content !== this.state.entry.content) {
      this.setState({
        entry: {
          ...this.state.entry,
          content: content
        },
        saved: false
      })
    }
  }

  handleClose = e => {
    e.preventDefault()

    // I REALLY DON'T LIKE THIS BUT IT'S THE ONLY
    // WAY I COULD ACHIEVE THE EFFECT (without causing the user to lose their data)
    document.querySelector('a').click()
  }

  render() {

    // grab the date from the params
    const d = this.props.match.params.date
    const isToday = m().isSame(d, 'day')
    let title = isToday ? 'Today' : m(d).format('dddd')
    let subtitle = m(d).format('MMM D, YYYY')

    // grab the entry out of state
    const { entry, saved } = this.state

    return (
      <form className="wrapper entry-form" onSubmit={this.handleSave}>
        <div className="top-bar">
          <Button
            type="close"
            htmlType="button"
            variant="alt"
            title="Close entry"
            onClick={this.handleClose} />

          <h2>{title}</h2>

          <Button
            type="save"
            htmlType="submit"
            variant={`accent ${!isToday ? 'invisible' : ''}`}
            title="Save entry"
            disabled={saved || !entry.content}
            onClick={this.handleSave} />
        </div>

        <p className="subtitle">{subtitle}</p>

        <textarea
          autoFocus={isToday}
          placeholder="Write something"
          onChange={this.handleUpdate}
          value={entry.content}
          rows="1">
        </textarea>

        <Prompt
          when={isToday && !saved}
          message="You have unsaved changes. Are you sure you want to leave?" />
      </form>
    )
  }
}
