import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './entry.sass'

import { Mood1, Mood2, Mood3, Mood4, Mood5 } from '../../images'

class Entry extends Component {
  render() {
    const { isToday, item } = this.props

    const moods = [
      { image: Mood1, title: 'Terrible' },
      { image: Mood2, title: 'Meh' },
      { image: Mood3, title: 'Neutral' },
      { image: Mood4, title: 'Good' },
      { image: Mood5, title: 'Great' }
    ]

    const mDate = !!item ? moment(item.date_created) : moment()
    const url = mDate.format('YYYY-MM-DD');
    const preview = isToday
      ? (item && 'Continue today\'s entry') || 'Write something'
      : item && item.content

    let MoodImage

    if (item && item.mood) {
      const mood = item.mood <= moods.length ? item.mood - 1 : 1
      MoodImage = moods[mood].image
    }

    return (
      <Link to={`/dashboard/entry/${url}`} className={`entry ${isToday ? 'today' : ''}`}>
        {!isToday ? (
          <span className="date">
            {mDate.format('ddd')}
            <strong>{mDate.format('DD')}</strong>
          </span>
        ) : ''}
        <span className="preview">
          {preview}
        </span>
        {!isToday && item ? (<MoodImage />) : ''}
      </Link>
    )
  }
}

Entry.propTypes = {
  isToday: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    date_created: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    mood: PropTypes.oneOf([1, 2, 3, 4, 5]).isRequired
  })
}

export default Entry
