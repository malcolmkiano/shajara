import React from 'react'
import moment from 'moment'
import EntryForm from './entry-form'

import { shallow } from 'enzyme'

describe('EntryForm', () => {

  // set up props
  const match = {
    params: {
      date: moment().format('YYYY-MM-DD')
    }
  }

  it('renders without crashing', () => {
    shallow(<EntryForm entries={[]} match={match} />)
  })

})

