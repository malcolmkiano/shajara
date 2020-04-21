import React from 'react'
import Loader from './loader'

import { shallow } from 'enzyme'

describe('Loader', () => {

  it('renders without crashing', () => {
    shallow(<Loader status={true} />)
  })

})

