import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
// import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

// import blogService from './services/blogs'
// import loginService from './services/login'

// import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { getCurrentUser, logoutUser, setUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'


const App = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  // init blogs and get their states using dispatch and selector .. .. .. 
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const blogs = useSelector( state => state.blogs)


  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])
  // set current user by retrieving from store
  const user = useSelector(state => state.user )

  // This feels stupid, examine model solution to see how they did it --> this is the way to do it
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(setUser(username,password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    // console.log('logging out',user.username)
    // clear storage
    // window.localStorage.clear()

    dispatch(logoutUser())

    // set user back to null
    setUser(null)
    setUsername('')
    setPassword('')

    // dispatch(setNotification('successfully logged out','success',5))
  }


  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <Login
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
          />
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

          {/* <BlogList /> */}

          {blogs.sort(byLikes).map(blog =>
            <Blog key={blog.id} blog={blog} user={user} />
          )}
        </div>
      }
    </>

  )
}

export default App