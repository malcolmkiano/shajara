import React from 'react'
import EntryList from './entry-list'

import { shallow } from 'enzyme'

describe('EntryList', () => {

  // set up props
  const emptyText = 'No entries'

  it('renders without crashing', () => {
    const wrapper = shallow(<EntryList showText={emptyText}/>)
    expect(wrapper.find('p').text()).toEqual(emptyText)
  })

})

