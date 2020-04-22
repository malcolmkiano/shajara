import React, { Component } from 'react'
import './settings.sass'

import { Button } from '../../../../components'
import AppContext from '../../dashboard-context'

class Settings extends Component {
  static contextType = AppContext

  componentDidMount() {
    document.title = 'Settings - Shajara - Journal App'
  }

  render() {
    return (
      <article className="wrapper settings">
        <h2>Settings</h2>
        <p className="centered">Customization options coming soon!</p>
        
        <Button type="fill" variant="alt" onClick={this.context.onLogOut}>
          Log Out
        </Button>

        <hr></hr>

        <h5 className="centered">Credits</h5>
        <ul className="credits">
          <li>
            Mood icons by <a target="_blank" rel="noreferrer noopener" href="https://www.flaticon.com/authors/alfredo-hernandez" title="Alfredo Hernandez on Flaticon">Alfredo Hernandez</a>
          </li>
          <li>
            Tab icons by <a target="_blank" rel="noreferrer noopener" href="https://www.flaticon.com/authors/prosymbols" title="Prosymbols on Flaticon">Prosymbols</a>
          </li>
          <li>
            Illustrations by <a target="_blank" rel="noreferrer noopener" href="https://jamesdaly.me" title="James Daly">James Daly</a>
          </li>
        </ul>
      </article>
    )
  }
}

export default Settings