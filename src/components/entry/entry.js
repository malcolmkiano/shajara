import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './entry.sass'

import { Mood1, Mood2, Mood3, Mood4, Mood5 } from '../../images'

export default class Entry extends Component {
  render() {
    const { item, type } = this.props

    const moods = [
      { image: Mood1, title: 'Terrible' },
      { image: Mood2, title: 'Meh' },
      { image: Mood3, title: 'Neutral' },
      { image: Mood4, title: 'Good' },
      { image: Mood5, title: 'Great' }
    ]

    const mDate = !!item ? moment(item.date) : moment()
    const url = mDate.format('YYYY-MM-DD');
    const preview = type === 'today'
      ? (item && 'Continue today\'s entry') || 'Write something'
      : item.content

    let MoodImage

    if (item) MoodImage = moods[item.mood - 1].image

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
        {type !== 'today' && item ? (<MoodImage />) : ''}
      </Link>
    )
  }
}
