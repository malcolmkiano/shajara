import React from 'react'
import { Link } from 'react-router-dom'
import { Swipeable } from 'react-swipeable'
import './landing-page.sass'

import { HeroImage, StoryImage, MoodImage, CustomizeImage } from '../../images'
import { Nav, Button, OnboardingItem, Dots } from '../../components'

class LandingPage extends React.Component {
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
        content: 'Set a theme color for the app to make Shajara truly yours.'
      }
    ]
  }

  componentDidMount() {
    document.title = 'Shajara - Journal App'

    // onboarding is meant only for mobile devices
    // if the window resizes after app is started
    // restart the onboarding process
    window.onresize = () => {
      if (this.state.step > 0) {
        this.setState({ step: 0 })
      }
    }
  }

  handleSwipe = e => {
    const direction = e.dir
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
        <Button type="prev" variant="alt" onClick={() => this.goToPage(this.state.step - 1)} />
      )

    // width of carousel
    const carouselWidth = (onboardingItems.length + 1) * 100

    // onboarding items in JSX
    const items = onboardingItems.map((item, index) => {
      return (
        <OnboardingItem
          key={item.title}
          onSwiped={this.handleSwipe}
          item={item}
          activeState={step === index + 1} />
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
              <HeroImage />
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
                  <span role="img" aria-label="Streaks">🔥</span>
                  Streaks to keep you in the habit of writing.
                </li>
                <li>
                  <span role="img" aria-label="Dark mode">🌙</span>
                  Dark mode, because you deserve it.
                </li>
                <li>
                  <span role="img" aria-label="Color">🎨</span>
                  App color customization.
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

export default LandingPage