import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector  } from 'react-redux'
import LogoutButton from './LogoutButton'

const Menu = () => {

    const user = useSelector(state => state.user)

    const padding = {
      paddingRight: 5
    }

    const navStyle = {
        padding: 5,
        backgroundColor: '#dbdbdb'
    }

    return (
      <div style={navStyle}>
        <Link to='/' style={padding}>blogs</Link>
        <Link to='/users' style={padding}>users</Link>
        {user.name} logged-in { }
        <LogoutButton />
      </div>
    )
  }

  export default Menu