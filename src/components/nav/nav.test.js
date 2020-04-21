import React from 'react'
import Nav from './nav'

import { shallow } from 'enzyme'

describe('Nav', () => {

  // set up props
  const content = 'Test Nav'

  it('renders without crashing', () => {
    const wrapper = shallow(<Nav><span>{content}</span></Nav>)
    expect(wrapper.text()).toEqual(content)
  })

})

