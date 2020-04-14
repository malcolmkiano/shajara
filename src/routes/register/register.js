import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './register.sass'

import { Nav, Button, Input } from '../../components'
import { validateField, API, TokenService } from '../../utils'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: [
        {
          label: 'First Name',
          id: 'first_name',
          value: '',
          type: 'text',
          required: true,
          pattern: /\S\w+/,
          format: 'Must have no spaces or numeric characters',
          error: null
        },
        {
          label: 'Email Address',
          id: 'email_address',
          value: '',
          type: 'email',
          required: true,
          pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          format: 'Must be a valid email address',
          error: null
        },
        {
          label: 'Password',
          id: 'password',
          value: '',
          type: 'password',
          required: true,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/,
          format: 'Must include at least 8 characters with 1 or more uppercase and 1 or more numbers',
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

    const newUser = {}
    fields.forEach(field => {
      newUser[field.id] = field.value
    })

    // send the info up to the server
    API.register(newUser)
      .then(() => {

        // handle the data that came back
        API.login({
          emailAddress: newUser.emailAddress,
          password: newUser.password
        })
          .then(res => {
            
            // save the auth info in localStorage
            const { first_name, authToken } = res
            TokenService.saveAuthInfo(first_name, authToken)

            // callback for successful registration
            this.props.history.push('/dashboard');

          })
        
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
      <section className="register">
        <Nav>
          <Link to="/" className="h3 logo">Shajara</Link>
          <ul className="links">
            <li><Link to="/login">Log In</Link></li>
          </ul>
        </Nav>

        <form
          className="wrapper"
          spellCheck="false"
          autoComplete="false"
          onSubmit={this.handleSubmit}>
          <h2>Hello there!</h2>
          <p>Please fill in the form to create a Shajara&nbsp;account.</p>

          <div className="fields">
            {fields}
          </div>

          <p className="disclaimer">By creating an account, you agree to let us securely store your information for use only in this application.</p>

          <Button type="fill">Create Account</Button>
        </form>
      </section>
    )
  }
}
