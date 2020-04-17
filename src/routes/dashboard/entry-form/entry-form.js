import React, { Component } from 'react'
import { Prompt } from 'react-router-dom'
import m from 'moment'
import './entry-form.sass'

import { Button } from '../../../components'
// import { API } from '../../../utils'
import AppContext from '../dashboard-context'
import { API } from '../../../utils'

export default class EntryForm extends Component {
  state = {
    entry: {
      date: new Date().toISOString(),
      text: '',
      id: null,
    },
    saved: true,
    loading: false
  }

  static contextType = AppContext

  componentDidMount() {
    const { entries } = this.context
    const d = this.props.match.params.date

    let entry = entries.find(e => m(e.date).isSame(d, 'day'))
    const isToday = m().isSame(d, 'day')

    // no entry at selected date (not today)
    if (!entry && !isToday) {
      alert('Something went wrong. Please try again later')
      this.props.history.goBack()
    } else {

      if (entry) {
        this.setState({
          entry: entry
        })
      }

    }
  }

  handleSave = e => {
    e.preventDefault()
    const { entry } = this.state
    const { id, text } = entry

    // set loading
    this.setState({ loading: true })

    if (id) {
      // if there is an ID in the state,
      // entry already exists on server and needs to be updated
      API.updateEntry(id, text)
        .then(() => {
          this.context.onEditEntry(id, text)
          this.setState({
            saved: true,
            loading: false
          })
        })
    } else {
      // otherwise, create a new entry
      API.createEntry(entry)
        .then(newEntry => {
          this.context.onCreateEntry(newEntry)
          this.setState({
            entry: newEntry,
            saved: true,
            loading: false
          })
        })
    }
  }

  handleUpdate = e => {
    const text = e.target.value
    if (text !== this.state.entry.text) {
      this.setState({
        entry: {
          ...this.state.entry,
          text: text
        },
        saved: false
      })
    }
  }

  handleClose = e => {
    e.preventDefault()
    this.props.history.goBack()
  }

  render() {

    // grab the date from the params
    const d = this.props.match.params.date
    const isToday = m().isSame(d, 'day')
    let title = isToday ? 'Today' : m(d).format('dddd')
    let subtitle = m(d).format('MMM D, YYYY')

    // grab the entry out of state
    const { entry, saved, loading } = this.state

    return (
      <form className="wrapper entry-form" onSubmit={this.handleSave}>
        <div className="top-bar">
          <Button
            type="close"
            htmlType="button"
            variant="alt"
            onClick={this.handleClose} />

          <h2>{title}</h2>

          <Button
            type="save"
            htmlType="submit"
            variant={`accent ${!isToday ? 'invisible' : ''}`}
            disabled={saved || !entry.text}
            onClick={this.handleSave} />
        </div>

        <p className="subtitle">{subtitle}</p>

        <div className={`loading-bar ${loading ? 'loading' : ''}`}>
        </div>

        <textarea
          autoFocus={isToday}
          placeholder="Write something"
          onChange={this.handleUpdate}
          value={entry.text}>
        </textarea>

        <Prompt when={isToday && !saved} message="You have unsaved changes. Are you sure you want to leave?" />
      </form>
    )
  }
}
