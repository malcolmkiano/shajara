import React from 'react'
import Premium from './premium'

import { shallow } from 'enzyme'

describe('Premium', () => {


  it('renders without crashing', () => {
    shallow(<Premium />)
  })

})

