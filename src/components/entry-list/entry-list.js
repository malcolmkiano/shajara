import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './entry-list.sass'

import { WriteImage as DefaultImage } from '../../images'

class EntryList extends Component {
  render() {
    const { entries, EmptyImage, showText, title } = this.props;
    let output;
    if (entries.length) {
      output = (
        <>
          {!!title ? (<h4 className="entry-list-title">{title}</h4>) : ''}
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
  title: PropTypes.string
}

EntryList.defaultProps = {
  entries: [],
  EmptyImage: DefaultImage
}

export default EntryList