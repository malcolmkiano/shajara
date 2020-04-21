import React from 'react'
import LandingPage from './landing-page'

import { shallow } from 'enzyme'

describe('LandingPage', () => {

  it('renders without crashing', () => {
    shallow(<LandingPage />)
  })

})

