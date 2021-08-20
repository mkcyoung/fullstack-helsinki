import React  from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LogoutButton = () => {
    const dispatch = useDispatch()
    
    const handleLogout = () => {
        dispatch(logoutUser())
      }

    return (
        <button onClick={() => handleLogout()} id='logout-button'>logout</button>
    )
}

export default LogoutButton