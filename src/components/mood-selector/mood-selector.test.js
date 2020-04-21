import React from 'react'
import MoodSelector from './mood-selector'

import { shallow } from 'enzyme'

describe('MoodSelector', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<MoodSelector mood={1} disabled={false} />)
    expect(wrapper.find('li').first().hasClass('selected')).toEqual(true)
  })

})

