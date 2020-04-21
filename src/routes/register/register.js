import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Nav, AuthForm } from '../../components'
import { API, TokenService } from '../../utils'
import { RegisterImage } from '../../images'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      fields: [
        {
          label: 'First Name',
          id: 'first_name',
          value: '',
          type: 'text',
          required: true,
          pattern: /^[A-Za-z'-]{2,30}$/,
          format: 'Must include 2 - 30 characters with no spaces or numeric characters',
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
          pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])+/,
          format: 'Must include 8 - 72 characters with at least 1 uppercase, 1 lowercase and 1 number',
          error: null
        }
      ]
    }
  }

  componentDidMount() {
    document.title = 'Register - Shajara - Journal App'
  }

  handleCreateAccount = newUser => {

    // send the info up to the server
    API.register(newUser)
      .then(() => {

        // automatically log the user in
        API.login({
          email_address: newUser.email_address,
          password: newUser.password
        })
          .then(res => {

            // save the auth info in localStorage
            const { first_name, authToken } = res
            TokenService.saveAuthInfo(first_name, authToken)

            // callback for successful login
            this.props.history.push('/dashboard')

          })
          .catch(err => {
            this.setState({
              error: err.message
            })
          })

      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })

  }

  handleClearError = () => {
    this.setState({
      error: null
    })
  }

  render() {
    return (
      <section className="register form-view">
        <Nav>
          <Link to="/" className="h3 logo">Shajara</Link>
          <ul className="links">
            <li><Link to="/login">Log In</Link></li>
          </ul>
        </Nav>

        <AuthForm
          title="Hello there!"
          description="Please fill in the form to create a Shajara&nbsp;account."
          Image={RegisterImage}
          fields={this.state.fields}
          onClearError={this.handleClearError}
          error={this.state.error}
          buttonText="Create Account"
          disclaimer="By creating an account, you agree to let us securely store your information for use only in this application."
          onSubmit={this.handleCreateAccount} />
      </section>
    )
  }
}

export default Register
