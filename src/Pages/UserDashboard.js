import React from 'react'
import { isAuthenticated } from '../Componenets/auth'

const UserDashboard = () => {

  const {user}= isAuthenticated()
  return (
    <>
    
    <h2>
      UserDashboard
      </h2>
      <h3>{user.email}</h3>
    </>
  )
}

export default UserDashboard