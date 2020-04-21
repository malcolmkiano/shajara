import React from 'react'
import OnboardingListItem from './ob-item'

import { shallow } from 'enzyme'

describe('OnboardingListItem', () => {

  // setup props
  const testItem = {
    title: 'Test',
    content: 'This is a test'
  }
  const activeState = true

  it('renders without crashing', () => {
    const wrapper = shallow(<OnboardingListItem item={testItem} activeState={activeState} />)
    expect(wrapper.find('h2').text()).toEqual(testItem.title)
    expect(wrapper.find('p').text()).toEqual(testItem.content)
  })

})

