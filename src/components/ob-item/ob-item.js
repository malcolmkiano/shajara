import React, { Component } from 'react'
import { Swipeable } from 'react-swipeable'
import './ob-item.sass'

export default class OnboardingListItem extends Component {
  render() {
    const { item, activeState } = this.props
    const Image = item.image
    return (
      <article key={item.title} className={`onboarding ${activeState}`}>
        <Swipeable className="wrapper" onSwiped={this.props.handleSwipe}>
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
