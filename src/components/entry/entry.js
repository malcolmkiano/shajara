import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './entry.sass'

export default class Entry extends Component {
  render() {
    const { item, type } = this.props
    const mDate = !!item ? moment(item.date) : moment()
    const url = mDate.format('YYYY-MM-DD');
    const preview = type === 'today'
      ? (item && 'Continue today\'s entry') || 'Write something'
      : item.content

    return (
      <Link to={`/dashboard/entry/${url}`} className={`entry ${type}`}>
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
