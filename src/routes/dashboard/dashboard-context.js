import React from 'react'

const AppContext = React.createContext({
  user_name: null, // to hold the user name
  token: null, // to hold the auth token
  entries: [], // to hold the journal entries from the server
  onCreateEntry: () => null, // to hold the callback function for entry creation
  onEditEntry: () => null, // to hold the callback function for entry editing (current day only)
  onOpenEntry: () => null // to do stuff when an entry is clicked
})

export default AppContext