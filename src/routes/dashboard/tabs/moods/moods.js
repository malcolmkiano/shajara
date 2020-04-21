import React, { Component } from 'react'
import './moods.sass'

import { Premium } from '../../../../components'
import AppContext from '../../dashboard-context'

class Moods extends Component {
  static contextType = AppContext

  componentDidMount() {
    document.title = 'Moods - Shajara - Journal App'
  }

  render() {
    return (
      <article className="wrapper moods centered">
        <h2>Moods</h2>
        <Premium />
      </article>
    )
  }
}

export default Moods
