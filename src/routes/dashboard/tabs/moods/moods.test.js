import React from 'react'
import Moods from './moods'

import { shallow } from 'enzyme'

describe('Moods', () => {

  it('renders without crashing', () => {
    shallow(<Moods />)
  })

})

