import React from 'react'
import Dots from './dots'

import { shallow } from 'enzyme'

describe('Dots', () => {

  // set up props
  const count = 3

  it('renders without crashing', () => {
    const wrapper = shallow(<Dots count={count} active={1} />)
    expect(wrapper.find('li')).toHaveLength(count)
    expect(wrapper.find('li').first().html()).toEqual('<li class="dot active"></li>')
  })

})

