import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './dots.sass'

class Dots extends Component {
  render() {
    let output = []
    const { count, active } = this.props
    for (let i = 1; i <= count; i++) {
      output.push(active === i)
    }

    return (
      <ul className="dots media-phone">
        {output.map((dot, index) => (
          <li key={index} className={`dot ${dot ? 'active' : ''}`}></li>
        ))}
      </ul>
    )
  }
}

Dots.propTypes = {
  count: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired
}

export default Dots