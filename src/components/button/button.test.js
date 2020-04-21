import React from 'react'
import Button from './button'

import { shallow } from 'enzyme'

describe('Button', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<Button>Test</Button>)
    expect(wrapper.find('button').text()).toEqual('Test')
  })

})

