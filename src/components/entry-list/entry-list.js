import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './entry-list.sass'

import { WriteImage as DefaultImage } from '../../images'

class EntryList extends Component {
  render() {
    const { entries, EmptyImage, showText, title, link } = this.props;
    let output;
    if (entries.length) {
      output = (
        <>
          <header className={`entry-list-header ${!title ? 'collapsed' : ''}`}>
            {!!title
              ? (<h4 className="entry-list-title">{title}</h4>)
              : ''}
            {!!link
              ? (<Link className="entry-list-link" to={link}>View All</Link>)
              : ''}
          </header>
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

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.element),
  EmptyImage: PropTypes.object,
  showText: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string
}

EntryList.defaultProps = {
  entries: [],
  EmptyImage: DefaultImage
}

export default EntryList