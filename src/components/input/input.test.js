import React from 'react'
import Input from './input'

import { shallow } from 'enzyme'

describe('Input', () => {

  // set up props
  const label = 'Test Input'

  it('renders without crashing', () => {
    const wrapper = shallow(<Input label={label} />)
    expect(wrapper.find('label').text()).toEqual(label)
  })

})

