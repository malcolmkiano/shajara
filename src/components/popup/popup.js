import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Swipeable } from 'react-swipeable'
import './popup.sass'

import { Button } from '..'

class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: !!props.message
    }
  }

  auto() {
    if (!!this.props.autoDismiss && !!this.props.message) {
      setTimeout(() => {
        this.dismiss()
      }, 3000)
    }
  }

  componentDidMount(){
    this.auto()
  }

  componentDidUpdate(props) {
    if (props.message !== this.props.message) {
      this.setState({
        visible: !!this.props.message
      })
      this.auto()
    }
  }

  handleSwipe = e => {
    const direction = e.dir
    if ((window.innerWidth < 480 && direction === 'Up') ||
        (window.innerWidth >= 480 && direction === 'Right')) {
      this.dismiss()
    }
  }

  dismiss = () => {
    this.setState({
      visible: false
    }, () => {
      setTimeout(() => {
        this.props.onDismiss()
      }, 500)
    })
  }

  render() {
    const { message, isError } = this.props
    const { visible } = this.state

    return (
      <Swipeable
        onSwiped={this.handleSwipe}
        className={`popup ${isError ? 'error' : ''} ${visible ? 'visible' : ''}`}>
        <p>{message}</p>
        <Button type="close" onClick={this.dismiss} />
      </Swipeable>
    )
  }
}

Popup.propTypes = {
  message: PropTypes.string,
  isError: PropTypes.bool.isRequired,
  autoDismiss: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired
}

export default Popup