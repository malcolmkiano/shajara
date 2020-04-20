import React, { Component } from 'react'
import { Prompt } from 'react-router-dom'
import m from 'moment'
import './entry-form.sass'

import { Button, MoodSelector } from '../../../../components'
import AppContext from '../../dashboard-context'

export default class EntryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: {
        date_created: new Date().toISOString(),
        content: '',
        mood: null,
        id: null,
      },
      saved: true
    }

    this.txt = React.createRef()
  }

  static contextType = AppContext

  getEntry = () => {
    const { entries } = this.props

    const d = this.props.match.params.date
    const isToday = m().isSame(d, 'day')
    let title = isToday ? 'Today' : m(d).format('dddd')
    document.title = `${title} - Shajara - Journal App`

    let entry = entries.find(e => m(e.date_created).isSame(d, 'day'))
    if (!entry) entry = {
      date_created: new Date().toISOString(),
      content: '',
      mood: 3,
      id: null,
    }

    if (this.state.entry.content !== entry.content) this.setState({
      entry: entry
    })

    this.resizeTextarea()
  }

  // this exists to scale the textarea (mainly for mobile views)
  resizeTextarea() {
    const txt = this.txt.current
    txt.style.height = txt.scrollHeight + 'px'
  }

  // if opened directly from the parent
  componentDidMount() {
    this.getEntry()
  }

  // get entries from parent once they're loaded
  // happens if user navigates directly to this route
  componentDidUpdate(props) {
    if (props.entries !== this.props.entries) {
      this.getEntry()
    }

    // resize the textarea on update
    this.resizeTextarea()
  }

  handleSave = e => {
    e.preventDefault()
    const { entry } = this.state
    if (entry.id) {
      // if there is an ID in the state,
      // entry already exists on server and needs to be updated
      this.context.onEditEntry(entry.id, entry)
    } else {
      // otherwise, create a new entry
      this.context.onCreateEntry(entry)
    }

    // sonly mark as saved if there were no errors
    if (!this.context.error)
      this.setState({
        saved: true
      })
  }

  handleUpdate = (field, value) => {
    const entry = {
      ...this.state.entry,
      [field]: value
    }

    this.setState({
      entry: entry,
      saved: false
    })
  }

  handleClose = (e = null) => {
    if (e) e.preventDefault()

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
        <header>
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
              disabled={saved}
              onClick={this.handleSave} />
          </div>

          <p className="subtitle">{subtitle}</p>

          <MoodSelector
            onChange={this.handleUpdate}
            mood={entry.mood} />
        </header>

        <textarea
          ref={this.txt}
          autoFocus={isToday}
          placeholder="Write something"
          readOnly={!isToday}
          onChange={e => this.handleUpdate('content', e.target.value)}
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
