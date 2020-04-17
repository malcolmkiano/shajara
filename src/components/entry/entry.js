import React, { Component } from 'react'
import moment from 'moment'
import './entry.sass'

export default class Entry extends Component {
  render() {
    const { content, onClick, type, first } = this.props
    const mDate = !!content ? moment(content.date) : moment()
    const preview = type === 'today'
      ? (!!first)
      ? 'Write your first entry'
      : (content && 'Continue today\'s entry') || 'Write something'
      : content.text

    return (
      <button className={`entry ${type}`} onClick={onClick}>
        {type !== 'today' ? (
          <span className="date">
            {mDate.format('ddd')}
            <strong>{mDate.format('DD')}</strong>
          </span>
        ) : ''}
        <span className="preview">
          {preview}
        </span>
      </button>
    )
  }
}
