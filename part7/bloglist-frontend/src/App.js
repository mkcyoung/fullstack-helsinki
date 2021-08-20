import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import { initializeBlogs } from './reducers/blogReducer'
import { getCurrentUser, logoutUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'


const App = () => {

  const dispatch = useDispatch()

  const blogFormRef = useRef()

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

  const handleLogout = () => {
    dispatch(logoutUser())
  }

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
            <button onClick={() => handleLogout()} id='logout-button'>logout</button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef} >
            <BlogForm />
          </Togglable>

          <BlogList />
        </div>
      }
    </>

  )
}

export default App