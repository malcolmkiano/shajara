import React from 'react'
import Settings from './settings'

import { shallow } from 'enzyme'

describe('Settings', () => {

  it('renders without crashing', () => {
    shallow(<Settings />)
  })

})

