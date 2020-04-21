import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './button.sass'

import { NextArrow, PrevArrow, CloseIcon, SaveIcon } from '../../images'

class Button extends Component {
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

Button.propTypes = {
  type: PropTypes.string,
  htmlType: PropTypes.string,
  hasLink: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string
}

Button.defaultProps = {
  htmlType: 'button',
  disabled: false,
  title: '',
  onClick: () => {}
}

export default Button
