import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Swipeable } from 'react-swipeable'
import './ob-item.sass'

import { HeroImage as DefaultImage } from '../../images'

class OnboardingListItem extends Component {
  render() {
    const { item, activeState } = this.props
    const Image = item.image || DefaultImage
    return (
      <article key={item.title} className={`onboarding ${activeState ? 'active' : ''}`}>
        <Swipeable className="wrapper" onSwiped={this.props.onSwiped}>
          <Image />
          <div className="content">
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        </Swipeable>
      </article>
    )
  }
}

OnboardingListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.object
  }).isRequired,
  activeState: PropTypes.bool.isRequired,
  onSwiped: PropTypes.func
}

OnboardingListItem.defaultProps = {
  onSwiped: () => {}
}

export default OnboardingListItem