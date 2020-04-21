import React from 'react'
import Home from './home'

import { shallow } from 'enzyme'

describe('Home', () => {

  // set up context
  const context = { entries: [] }

  it('renders without crashing', () => {
    shallow(<Home />, { context })
  })

})

