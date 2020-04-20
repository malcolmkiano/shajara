import React, { Component } from 'react'
import './auth-form.sass'

import { Button, Input } from '../../components'
import { validateField } from '../../utils'

export default class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: props.error,
      fields: props.fields
    }
  }

  componentDidUpdate(props) {
    if (props.error !== this.props.error) {
      this.setState({
        error: this.props.error
      })
    }
  }

  handleChange = e => {
    const { fields } = this.state
    const index = fields.findIndex(f => f.id === e.target.id)
    fields[index] = validateField(fields[index], e.target.value)

    // clear the error if there is one
    if (this.state.error) this.props.onClearError()

    this.setState({
      fields: fields
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { fields } = this.state
    if (fields.some(field => !!field.error)) {
      const { id } = fields.find(field => !!field.error)
      document.querySelector(`#${id}`).focus()
      return false
    }

    const data = {}
    fields.forEach(field => {
      data[field.id] = field.value
    })

    this.props.onSubmit(data)
  }

  render() {
    const { error, fields } = this.state
    const { title, description, Image, buttonText, disclaimer, imageBG } = this.props
    return (
      <article className="auth-form form-content">
        <div className={`artwork media-tablet ${imageBG}`}>
          <Image />
        </div>

        <form
          className="wrapper"
          spellCheck="false"
          autoComplete="off"
          onSubmit={this.handleSubmit}>
          <h2>{title}</h2>
          <p className="description">{description}</p>

          {!!error ? (
            <p className="error">{error}</p>
          ) : ''}

          <div className="fields">
            {fields.map(field => (
              <Input
                key={field.id}
                {...field}
                onChange={this.handleChange}
              />
            ))}
          </div>

          {!!disclaimer ? (
            <p className="disclaimer">{disclaimer}</p>
          ) : ''}

          <Button htmlType="submit" type="fill">{buttonText}</Button>
        </form>
      </article>
    )
  }
}
