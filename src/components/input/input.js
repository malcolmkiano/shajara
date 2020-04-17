import React, { Component } from 'react'
import './input.sass'

export default class Input extends Component {
  render() {
    const props = { ...this.props }
    const unsafeFields = ['id', 'label', 'error', 'format', 'placeholder', 'pattern']
    unsafeFields.forEach(field => { delete props[field] })

    return (
      <div className="input">
        <input
          {...props}
          className={!!props.value.trim() ? 'dirty' : ''}
          id={this.props.id} />
        <label htmlFor={this.props.id}>
          {this.props.label || 'Label'}
          {!!this.props.required ? (<span>*</span>) : ''}
        </label>
        {this.props.error ? (<span className="error">{this.props.error}</span>) : ''}
      </div>
    )
  }
}
