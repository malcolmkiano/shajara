import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Nav, AuthForm } from '../../components'
import { API, TokenService } from '../../utils'
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

    // send the info up to the server
    API.login(credentials)
      .then(res => {
        
        // save the auth info in localStorage
        const { first_name, authToken } = res
        TokenService.saveAuthInfo(first_name, authToken)

        // callback for successful login
        this.props.history.push('/dashboard');

      })
      .catch(err => {
        this.setState({
          error: err
        })
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
          image={LoginImage}
          imageBG="alt"
          fields={this.state.fields}
          error={this.state.error}
          buttonText="Log In"
          onSubmit={this.handleLogin}/>
      </section>
    )
  }
}
