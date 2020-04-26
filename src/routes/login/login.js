import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './login.sass'

import { Loader, Nav, AuthForm } from '../../components'
import { API, TokenService } from '../../utils'
import { LoginImage } from '../../images'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      loading: false,
      fields: [
        {
          label: 'Email Address',
          id: 'email_address',
          value: '',
          type: 'email',
          pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          format: 'Must be a valid email address',
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

  componentDidMount() {
    document.title = 'Log In - Shajara - Journal App'
  }

  handleLogin = credentials => {

    // load
    this.setState({ loading: true })

    // send it up
    API.login(credentials)
      .then(res => {

        // save the auth info in localStorage
        const { first_name, authToken } = res
        TokenService.saveAuthInfo(first_name, authToken)

        // callback for successful login
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/dashboard'
        history.push(destination)

      })
      .catch(err => {
        if (typeof err.message !== 'string') err.message = 'Something went wrong. Please try again later.'
        this.setState({
          error: err.message,
          loading: false
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
      <section className="login form-view">
        <Nav>
          <Link to="/" className="h3 logo">Shajara</Link>
          <ul className="links">
            <li><Link to="/register">Register</Link></li>
          </ul>
        </Nav>

        <AuthForm
          title="Welcome back!"
          description="Please fill in the form to sign in to your Shajara&nbsp;account."
          Image={LoginImage}
          imageBG="alt"
          onClearError={this.handleClearError}
          fields={this.state.fields}
          error={this.state.error}
          buttonText="Log In"
          onSubmit={this.handleLogin} />
        
        <Loader status={this.state.loading} />
      </section>
    )
  }
}

export default Login
