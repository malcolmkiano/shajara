import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './loader.sass'

class Loader extends Component {
  state = {
    hidden: false
  }

  handleHidden = () => {
    this.setState({
      hidden: true
    })
  }

  render() {
    const { status } = this.props
    const { hidden } = this.state
    return (
      <div
        onTransitionEnd={!this.props.status ? this.handleHidden : () => null}
        className={`loader ${!status ? 'complete' : ''} ${hidden ? 'out' : ''}`}>
        <span></span>
      </div>
    )
  }
}

Loader.propTypes = {
  status: PropTypes.bool.isRequired
}

export default Loader
