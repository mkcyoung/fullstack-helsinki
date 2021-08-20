import React, { useEffect } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import TogglableBlogForm from './components/TogglableBlogForm'
import LogoutButton from './components/LogoutButton'

import { initializeBlogs } from './reducers/blogReducer'
import { getCurrentUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'


const App = () => {

  const dispatch = useDispatch()

  // init blogs
  useEffect(() => {
    dispatch(initializeBlogs())
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
        <div>
          <h2>blogs</h2>

          <Notification />

          <p>{user.name} logged-in
            <LogoutButton />
          </p>

          <TogglableBlogForm />

          <BlogList />
        </div>
      }
    </>

  )
}

export default App