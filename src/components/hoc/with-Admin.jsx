import React from 'react'
import { role } from '../../constants'

const withAdmin = (WrappedComponent) => (props) => {
  return (
    <WrappedComponent {...props} isAdmin={props.loggedUser.role === role.ADMIN ? true : false} />
  )
}

export default withAdmin
