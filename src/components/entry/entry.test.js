import React from 'react'
import moment from 'moment'
import Entry from './entry'

import { shallow } from 'enzyme'

describe('Entry', () => {

  // set up props
  const dateYesterday = moment().subtract(1, 'days')
  const dateText = dateYesterday.format('dddDD')
  const testItem = { date_created: dateYesterday.toISOString(), content: 'Test entry', mood: 5 }

  it('renders without crashing', () => {
    const wrapperToday = shallow(<Entry isToday={true} />)
    expect(wrapperToday.find('.preview').text()).toEqual('Write something')

    const wrapperYesterday= shallow(<Entry isToday={false} item={testItem} />)
    expect(wrapperYesterday.find('.date').text()).toEqual(dateText)
    expect(wrapperYesterday.find('.preview').text()).toEqual(testItem.content)
  })

})

