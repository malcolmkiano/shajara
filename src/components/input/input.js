import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './input.sass'

class Input extends Component {
  render() {
    const props = { ...this.props }
    const unsafeFields = ['id', 'label', 'error', 'format', 'placeholder', 'pattern']
    unsafeFields.forEach(field => { delete props[field] })

    return (
      <div className="input">
        <input
          {...props}
          className={!!props.value.trim() ? 'dirty' : ''}
          aria-invalid={!!this.props.error}
          id={this.props.id} />
        <label htmlFor={this.props.id}>
          {this.props.label || 'Label'}
          {!!this.props.required ? (<span aria-hidden={true}>*</span>) : ''}
        </label>
        {this.props.error ? (<span className="error" role="alert">{this.props.error}</span>) : ''}
      </div>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  pattern: PropTypes.instanceOf(RegExp),
  format: PropTypes.string,
  error: PropTypes.string
}

Input.defaultProps = {
  value: '',
  id: ''
}

export default Input