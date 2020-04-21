import React from 'react'
import Entries from './entries'

import { shallow } from 'enzyme'

describe('Entries', () => {

  // set up context
  const context = { entries: [] }

  it('renders without crashing', () => {
    shallow(<Entries />, { context })
  })

})

