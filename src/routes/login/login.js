import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './login.sass'

import { Nav, Button, Input } from '../../components'
import { validateField, API, TokenService } from '../../utils'
import { LoginImage } from '../../images'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: [
        {
          label: 'Email Address',
          id: 'email_address',
          value: '',
          type: 'email',
          required: true,
          error: null
        },
        {
          label: 'Password',
          id: 'password',
          value: '',
          type: 'password',
          required: true,
          error: null
        }
      ]
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    const { fields } = this.state
    if (fields.some(field => !!field.error)) {
      const { id } = fields.find(field => !!field.error)
      document.querySelector(`#${id}`).focus()
      return false
    }

    const credentials = {}
    fields.forEach(field => {
      credentials[field.id] = field.value
    })

    // send the info up to the server
    API.login(credentials)
      .then(res => {
        
        // save the auth info in localStorage
        const { first_name, authToken } = res
        TokenService.saveAuthInfo(first_name, authToken)

        // callback for successful registration
        this.props.history.push('/dashboard');

      })
      .catch(err => {
        console.log(err)
      })

  }

  handleChange = e => {
    const { fields } = this.state
    const index = fields.findIndex(f => f.id === e.target.id)
    fields[index] = validateField(fields[index], e.target.value)

    this.setState({
      fields: fields
    })
  }

  render() {
    const fields = this.state.fields.map(field => (
      <Input
        key={field.id}
        {...field}
        onChange={this.handleChange}
      />
    ))
    return (
      <section className="login form-view">
        <Nav>
          <Link to="/" className="h3 logo">Shajara</Link>
          <ul className="links">
            <li><Link to="/register">Register</Link></li>
          </ul>
        </Nav>

        <article className="form-content">
          <div className="artwork alt media-tablet">
            <img src={LoginImage} alt="Woman sitting at a table, holding a pencil"/>
          </div>

          <form
            className="wrapper"
            spellCheck="false"
            autoComplete="off"
            onSubmit={this.handleSubmit}>
            <h2>Welcome back!</h2>
            <p>Please fill in the form to sign in to your Shajara&nbsp;account.</p>

            <div className="fields">
              {fields}
            </div>

            <Button type="fill">Log In</Button>
          </form>
        </article>
      </section>
    )
  }
}
