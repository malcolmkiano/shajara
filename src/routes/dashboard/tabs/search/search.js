import React, { Component } from 'react'
import queryString from 'query-string'
import './search.sass'

import { SearchImage } from '../../../../images'
import { Input, Button, EntryList } from '../../../../components'
import { EntryService } from '../../../../utils'
import AppContext from '../../dashboard-context'

class Search extends Component {
  static contextType = AppContext

  state = {
    results: []
  }

  performSearch = () => {
    const query = this.props.location && queryString.parse(this.props.location.search).q
    const { entries } = this.context
    this.setState({
      query: query,
      results: query ? EntryService.search(query, entries) : []
    })
  }

  componentDidMount() {
    document.title = 'Search - Shajara - Journal App'
    this.performSearch()
  }

  componentDidUpdate(props) {
    if ((props.entries !== this.props.entries) ||
      (props.location && props.location.search !== this.props.location.search)) {
      this.performSearch()
    }
  }

  handleUpdate = e => {
    const query = e.target.value

    this.props.history.push({
      pathname: '/dashboard/search',
      search: query && '?q=' + query
    })
  }

  render() {
    const { query, results } = this.state
    const months = results.map(([month, entries]) => {
      const list = entries.map(entry => EntryService.makeComponent(entry))
      return (
        <div key={month} className="month">
          <h3 className="h5">{month}</h3>
          <ul className="results">
            <EntryList entries={list} />
          </ul>
        </div>
      )
    })

    return (
      <form className="wrapper search">
        <h2>Search</h2>
        <div className="search-field">
          <Input
            value={query}
            onChange={this.handleUpdate}
            label="Query"
            placeholder="Query"
            autoFocus={true} />
            
          <Button type="search" variant="alt" disabled={true} />
        </div>
        {results.length
          ? months
          : (
            <EntryList
              EmptyImage={SearchImage}
              showText={query ? 'No entries matched your query' : 'Search for entries using keywords'} />
          )}
      </form>
    )
  }
}

export default Search