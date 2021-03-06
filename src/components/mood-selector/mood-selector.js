import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './mood-selector.sass'

import { Mood1, Mood2, Mood3, Mood4, Mood5 } from '../../images'

class MoodSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.mood || 5
    }
  }

  componentDidUpdate(props) {
    if (props.mood !== this.props.mood) {
      this.setState({
        current: this.props.mood
      })
    }
  }

  handleChange = e => {
    const newMood = parseInt(e.target.value)
    this.setState({
      current: newMood,
      active: false
    }, () => {
      this.props.onChange('mood', newMood)
    })
  }

  render() {
    const moods = [
      { image: Mood1, title: 'Terrible' },
      { image: Mood2, title: 'Meh' },
      { image: Mood3, title: 'Neutral' },
      { image: Mood4, title: 'Good' },
      { image: Mood5, title: 'Great' }
    ]

    const { current } = this.state
    const { disabled } = this.props

    const moodList = moods.map((mood, index) => {
      const i = index + 1
      const MoodImage = mood.image

      return (
        <li key={i} className={current === i ? 'selected' : ''}>
          <input
            type="radio"
            checked={current === i}
            onChange={!disabled ? this.handleChange : () => {}}
            name="mood"
            id={`mood-${i}`}
            value={i} />

          <label htmlFor={`mood-${i}`}>
            <MoodImage title={`${mood.title} mood`} />
          </label>
        </li>
      )
    })

    return (
      <div className={`mood-selector ${disabled ? 'disabled' : ''}`}>
        <ul className="mood-list">
          {moodList}
        </ul>
      </div>
    )
  }
}

MoodSelector.propTypes = {
  mood: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default MoodSelector