import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

describe('App', () => {

  // smoke test to see if app renders at all
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

})

