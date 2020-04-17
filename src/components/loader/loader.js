import React, { Component } from 'react'
import './loader.sass'

export default class Loader extends Component {
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
        onTransitionEnd={this.handleHidden}
        className={`loader ${!status ? 'complete' : ''} ${hidden ? 'out' : ''}`}>
        <span></span>
      </div>
    )
  }
}
