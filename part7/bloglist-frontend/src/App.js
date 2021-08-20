import React, { useEffect } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import TogglableBlogForm from './components/TogglableBlogForm'
import LogoutButton from './components/LogoutButton'
import UserList from './components/UserList'

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

  // Retrieve current user if there is one
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])
  // set current user by retrieving from store
  const user = useSelector(state => state.user )

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
            <Route path='/users'>
              <h2>users</h2>
              <UserList />
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