import React from 'react'
import TabBar from './tab-bar'

import { shallow } from 'enzyme'

describe('TabBar', () => {

  it('renders without crashing', () => {
    shallow(<TabBar />)
  })

})

