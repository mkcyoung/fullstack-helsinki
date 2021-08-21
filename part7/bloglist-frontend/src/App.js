import React, { useEffect } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import TogglableBlogForm from './components/TogglableBlogForm'
import LogoutButton from './components/LogoutButton'
import UserTable from './components/UserTable'
import User from './components/User'

import { initializeBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/usersReducer'
import { getCurrentUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

import {
  Switch, Route, Link,
  useHistory,
  useRouteMatch
} from 'react-router-dom'


const App = () => {

  const dispatch = useDispatch()

  // init blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // init users
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  const users = useSelector(state => state.users)

  // Retrieve current user if there is one
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])
  // set current user by retrieving from store
  const user = useSelector(state => state.user )

  const usersById = (id) => {
    return users.find(a => a.id === id)
  }

  // finds user with id that matches the route url 
  const match = useRouteMatch('/users/:id')
  const clickedUser = match
    ? usersById(match.params.id)
    : null


  return (
    <>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm />
        </div> :
        <>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} logged-in
          <LogoutButton />
          </p>

          <Switch>
            <Route path='/users/:id'>
              <User user={clickedUser}/>
            </Route>
            <Route path='/users'>
              <UserTable />
            </Route>
            <Route path='/'>
              <div>
                <TogglableBlogForm />
                <BlogList />
              </div>
            </Route>
        </Switch>

      </>
        
      }
    </>

  )
}

export default App