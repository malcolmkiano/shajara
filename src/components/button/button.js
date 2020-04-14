import React, { Component } from 'react'

import './button.sass'

export default class Button extends Component {
  render() {
    let content = this.props.children
    const { type } = this.props
    const validTypes = { next: 'arrow_forward_ios', prev: 'arrow_back_ios' }
    if (type && Object.keys(validTypes).includes(type)) content = (
      <i className="material-icons">{validTypes[type]}</i>
    );

    if (!content) content = 'Forgetting something?'
    return (
      <button className={`btn ${type}`} onClick={this.props.onClick}>
        {content}
      </button>
    )
  }
}
