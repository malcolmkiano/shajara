import React from 'react'
import Popup from './popup'

import { shallow } from 'enzyme'

describe('Popup', () => {

  const message = 'Test message'
  const isError = false
  const mockFn = jest.fn(() => { return true })

  it('renders without crashing', () => {
    const wrapper = shallow(
      <Popup
        message={message}
        isError={isError}
        autoDismiss={false}
        onDismiss={mockFn} />
    )

    expect(wrapper.find('p').text()).toEqual(message)
    wrapper.instance().props.onDismiss()
    expect(mockFn).toHaveBeenCalled()
  })

})