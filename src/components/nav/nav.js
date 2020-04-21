import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './nav.sass'

class Nav extends Component {
  render() {
    return (
      <nav>
        <div className="wrapper">
          {this.props.children}
        </div>
      </nav>
    )
  }
}

Nav.propTypes = {
  children: PropTypes.node.isRequired
}

export default Nav
