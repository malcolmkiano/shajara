import React, { Component } from 'react'
import './button.sass'

import { NextArrow, PrevArrow } from '../../images'

export default class Button extends Component {
  render() {
    let content = this.props.children
    const { type, hasLink } = this.props
    const validTypes = { next: NextArrow, prev: PrevArrow }
    if (type && Object.keys(validTypes).includes(type)) {
      const Arrow = validTypes[type]
      content = (<Arrow />)
    }

    if (!content) content = 'Forgetting something?'
    return (
      <button className={`btn ${type} ${hasLink ? 'link' : ''}`} onClick={this.props.onClick}>
        {content}
      </button>
    )
  }
}
