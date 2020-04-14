import React from 'react'
import { Link } from 'react-router-dom'
import { Swipeable } from 'react-swipeable'
import './landing-page.sass'

import { HeroImage, StoryImage, MoodImage, CustomizeImage } from '../../images'
import { Nav, Button, OnboardingItem, Dots } from '../../components'

export default class LandingPage extends React.Component {
  state = {
    step: 0,
    onboardingItems: [
      {
        image: StoryImage,
        title: 'Find yourself',
        content: 'Turn your attention inwards and write your story each day like no one else can!'
      },
      {
        image: MoodImage,
        title: 'Track your mood',
        content: 'Get insight about your mood day by day and understand yourself better.'
      },
      {
        image: CustomizeImage,
        title: 'Make it yours',
        content: 'Customize each entry with a unique color to make Shajara truly yours.'
      }
    ]
  }

  componentDidMount() {
    window.onresize = () => {
      if (this.state.step > 0) {
        this.setState({ step: 0 })
      }
    }
  }

  handleSwipe = e => {
    const direction = e.dir;
    if (direction === 'Right') {
      if (this.state.step > 0) {
        this.setState({ step: this.state.step - 1 })
      }
    } else if (direction === 'Left') {
      if (this.state.step < this.state.onboardingItems.length) {
        this.setState({ step: this.state.step + 1 })
      }
    }
  }

  goToPage(n) {
    this.setState({
      step: n
    })
  }

  render() {
    const { onboardingItems, step } = this.state

    // show text or arrow in bottom button
    const currentlyOnboarding = !!(step > 0 && step < onboardingItems.length)
    const buttonType = currentlyOnboarding ? 'next' : 'fill'

    // user on page zero?
    const isLast = !!(step === onboardingItems.length)
    const isZero = step === 0 ? 'active' : ''
    const buttonContent = !!isZero ? 'Get Started' : (
      <Link to="/register">Register</Link>
    )

    // top left link
    const leftLink = !!isZero ? (
      <Link to="/" className="h3 logo">Shajara</Link>
    ) : (
        <Button type="prev" onClick={() => this.goToPage(this.state.step - 1)} />
      )

    // width of carousel
    const carouselWidth = (onboardingItems.length + 1) * 100

    // onboarding items in JSX
    const items = onboardingItems.map((item, index) => {
      const activeState = step === index + 1 ? 'active' : ''
      return (
        <OnboardingItem key={item.title} handleSwipe={this.handleSwipe} item={item} activeState={activeState} />
      )
    })

    return (
      <section className="landing-page">

        <h1 className="hidden">Shajara</h1>

        <Nav>
          {leftLink}
          <ul className="links">
            <li className="media-tablet"><Link to="/register">Register</Link></li>
            <li><Link to="/login">Log In</Link></li>
          </ul>
        </Nav>

        <div className={`items pos-${step}`} style={{ '--cWidth': `${carouselWidth}vw` }}>
          <article className={`hero ${isZero}`}>
            <Swipeable className="wrapper" onSwiped={this.handleSwipe}>
              <h2 className="h1">The better way to keep track of your&nbsp;days.</h2>
              <div className="media-tablet">
                <p>
                  Shajara lets you take down your daily thoughts and mood in a beautiful way. Get in touch with your personal development, and read and relive your great memories!
                </p>
              </div>
              <img draggable="false" src={HeroImage} alt="Person thinking about apples, school, work, and other things" />
            </Swipeable>
          </article>

          <h2 className="media-tablet ft">Features</h2>
          {items}

          <div className="highlights media-tablet">
            <div className="wrapper">
              <h3>AND MORE...</h3>
              <ul className="featureList">
                <li>
                  <span role="img" aria-label="Pen">📝</span>
                  Write down your thoughts/happenings each day.
                </li>
                <li>
                  <span role="img" aria-label="Cloud">🌐</span>
                  Cloud syncing across devices.
                </li>
                <li>
                  <span role="img" aria-label="Mood">😨</span>
                  Mood tracking statistics.
                </li>
                <li>
                  <span role="img" aria-label="Color">🎨</span>
                  Entry color customization.
                </li>
                <li>
                  <span role="img" aria-label="Streaks">🔥</span>
                  Streaks to keep you in the habit of writing.
                </li>
                <li>
                  <span role="img" aria-label="Dark mode">🌙</span>
                  Dark mode (manual or scheduled).
                </li>
              </ul>
            </div>
          </div>

          <footer className="media-tablet">
            <p>Designed & developed by <a href="https://malcolmkiano.com" rel="noreferrer noopener" target="_blank">Malcolm Kiano</a></p>
          </footer>

        </div>

        {currentlyOnboarding || (!!isLast)
          ? <Dots count={onboardingItems.length} active={step} />
          : ''}

        <Button
          type={buttonType}
          hasLink={isLast}
          onClick={(!!isZero || !!currentlyOnboarding)
            ? () => this.goToPage(this.state.step + 1)
            : () => null}>
          {buttonContent}
        </Button>

      </section>
    )
  }
}