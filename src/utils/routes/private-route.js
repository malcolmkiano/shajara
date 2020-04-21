import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { TokenService } from '..'

export default function PrivateRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Component {...componentProps} />
          : <Redirect
            to={{
              pathname: '/login',
              state: { from: componentProps.location }
            }}
          />
      )}
    />
  )
}
