import React from 'react'

const AppContext = React.createContext({
  user_name: null, // to hold the user name
  entries: [], // to hold the journal entries from the server
  error: null, // to hold any errors
  theme: {}, // to hold theme colors
  onCreateEntry: () => null, // to hold the callback function for entry creation
  onEditEntry: () => null, // to hold the callback function for entry editing (current day only)
  onThemeChanged: () => null, // to hold the callback function for when app theme is changed
  onLogout: () => null, // to hold callback function for logging out
})

export default AppContext