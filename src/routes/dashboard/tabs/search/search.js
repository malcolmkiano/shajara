import React, { Component } from 'react'
import './search.sass'

import { Premium } from '../../../../components'
import AppContext from '../../dashboard-context'

class Search extends Component {
  static contextType = AppContext

  componentDidMount() {
    document.title = 'Search - Shajara - Journal App'
  }

  render() {
    return (
      <article className="wrapper search centered">
        <h2>Search</h2>
        <Premium />
      </article>
    )
  }
}

export default Search