import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './entry.sass'

export default class Entry extends Component {
  render() {
    const { url, content, onClick, type } = this.props
    const mDate = !!content ? moment(content.date) : moment()
    const preview = type === 'today'
      ? (content && 'Continue today\'s entry') || 'Write something...'
      : content.text

    return (
      <Link to={url} className={`entry ${type}`} onClick={onClick}>
        {type !== 'today' ? (
          <span className="date">
            {mDate.format('ddd')}
            <strong>{mDate.format('DD')}</strong>
          </span>
        ) : ''}
        <span className="preview">
          {preview}
        </span>
      </Link>
    )
  }
}
