import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
// import LogoutButton from './LogoutButton'
import { Menu } from 'antd'
import { useRouteMatch } from 'react-router-dom'

import { UserOutlined, PoweroffOutlined, TeamOutlined, CopyOutlined } from '@ant-design/icons'

import { logoutUser } from '../reducers/userReducer'

const { SubMenu } = Menu


const navMenu = () => {

  const dispatch = useDispatch()
    
  const handleLogout = () => {
      dispatch(logoutUser())
    }


  // checks out route match to render correct active key
  const matchUser = useRouteMatch('/users')
  const clicked = matchUser
    ? 'users'
    : 'blogs'

  const user = useSelector(state => state.user)

  const padding = {
    paddingRight: 5
  }

  const navStyle = {
      padding: 5,
      backgroundColor: '#dbdbdb'
  }


  return (

    <Menu defaultSelectedKeys={clicked} mode='horizontal'>
      <Menu.Item key='blogs' icon={<CopyOutlined />}>
        <Link to='/' style={padding}>blogs</Link>
      </Menu.Item>
      <Menu.Item key='users' icon={<TeamOutlined />}>
        <Link to='/users' style={padding}>users</Link>
      </Menu.Item>
      <SubMenu style={{ float: 'right' }} key='user' title={user.name} icon={<UserOutlined />}>
        <Menu.Item onClick={() => handleLogout()} key='logout' icon={<PoweroffOutlined />}>
          logout
        </Menu.Item>
      </SubMenu>
    </Menu>
    
    // <div style={navStyle}>
    //   <Link to='/' style={padding}>blogs</Link>
    //   <Link to='/users' style={padding}>users</Link>
    //   {user.name} logged-in { }
    //   <LogoutButton />
    // </div>
  )
}

export default navMenu