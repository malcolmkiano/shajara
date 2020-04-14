import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { TokenService } from '.'

export default function PublicOnlyRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Redirect to={'/dashboard'} />
          : <Component {...componentProps} />
      )}
    />
  )
}
