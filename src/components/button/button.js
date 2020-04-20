import React, { Component } from 'react'
import './button.sass'

import { NextArrow, PrevArrow, CloseIcon, SaveIcon } from '../../images'

export default class Button extends Component {
  render() {
    let content = this.props.children
    const { type, htmlType, hasLink, variant, disabled, title } = this.props
    const validTypes = {
      next: NextArrow,
      prev: PrevArrow,
      close: CloseIcon,
      save: SaveIcon
    }

    if (type && Object.keys(validTypes).includes(type)) {
      const Arrow = validTypes[type]
      content = (<Arrow />)
    }

    if (!content) content = 'Forgetting something?'
    return (
      <button
        type={htmlType}
        disabled={disabled}
        title={title}
        className={`btn ${type || ''} ${variant || ''} ${hasLink ? 'link' : ''}`}
        onClick={this.props.onClick}>
        {content}
      </button>
    )
  }
}
