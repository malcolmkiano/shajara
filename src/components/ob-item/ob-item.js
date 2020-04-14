import React, { Component } from 'react'
import { Swipeable } from 'react-swipeable'
import './ob-item.sass'

export default class OnboardingListItem extends Component {
  handleSwipe = e => {
    if (e.dir === 'Left' || e.dir === 'Right') this.props.handleSwipe(e.dir)
  }

  render() {
    const { item, activeState } = this.props
    return (
      <article key={item.title} className={`onboarding ${activeState}`}>
        <Swipeable className="wrapper" onSwiped={this.handleSwipe}>
          <img draggable="false" src={item.image} alt={item.title} />
          <div className="content">
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </div>
        </Swipeable>
      </article>
    )
  }
}
