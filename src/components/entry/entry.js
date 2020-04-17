import React, { Component } from 'react'
import moment from 'moment'
import './entry.sass'

export default class Entry extends Component {
  handleClick = () => {
    if (this.props.content) {
      this.props.onClick(this.props.content.id)
    } else {
      this.props.onClick()
    }
  }

  render() {
    const { content, type } = this.props
    const mDate = !!content ? moment(content.date) : moment()
    const preview = type === 'today'
      ? (content && 'Continue today\'s entry') || 'Write something'
      : content.text

    return (
      <button className={`entry ${type}`} onClick={this.handleClick}>
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
