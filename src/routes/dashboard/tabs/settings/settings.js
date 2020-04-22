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

        <h6 className="centered">Credits</h6>
        <ul className="credits">
          <li>
            Mood icons made by <a target="_blank" rel="noreferrer noopener" href="https://www.flaticon.com/authors/alfredo-hernandez" title="Alfredo Hernandez">Alfredo Hernandez</a> from <a target="_blank" rel="noreferrer noopener" href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>
          </li>
          <li>
            Tab icons made by <a target="_blank" rel="noreferrer noopener" href="https://www.flaticon.com/authors/prosymbols" title="Prosymbols">Prosymbols</a> from <a target="_blank" rel="noreferrer noopener" href="https://www.flaticon.com/" title="Flaticon">Flaticon</a>
          </li>
          <li>
            Illustrations made by <a target="_blank" rel="noreferrer noopener" href="https://jamesdaly.me" title="James Daly">James Daly</a> from <a target="_blank" rel="noreferrer noopener" href="https://drawkit.io" title="DrawKit">DrawKit</a>
          </li>
        </ul>
      </article>
    )
  }
}

export default Settings