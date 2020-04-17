import React, { Component } from 'react'
import './entry-list.sass'

export default class EntryList extends Component {
  render() {
    const { entries, EmptyImage, showText, title } = this.props;
    let output;
    if (entries.length) {
      output = (
        <>
          {!!title ? (<h4>{title}</h4>) : ''}
          <ul className="entry-list">
            {entries}
          </ul>
        </>
      )
    } else {
      output = (
        <div className="entry-list-empty">
          <EmptyImage />
          {!!showText ? (<p>{showText}</p>) : ''}
        </div>
      )
    }

    return output
  }
}
