import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
// import BlogList from './components/BlogList'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

import { useDispatch, useSelector } from 'react-redux'


const App = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  // init blogs and get their states using dispatch and selector .. .. .. 
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const blogs = useSelector( state => state.blogs)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // This feels stupid, examine model solution to see how they did it --> this is the way to do it
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  // This should be handled in the reducer 
  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(n => n.id !== blog.id))
      dispatch(setNotification(`"${blog.title}" successfully deleted.`,'success',5))
    }
    catch (exception) {
      dispatch(setNotification(exception,'error',5))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification(`${user.username} logged in`,'success',5))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials','error',5))
    }

    console.log('logging in with', username)
  }

  const handleLogout = () => {
    console.log('logging out',user.username)
    // clear storage
    window.localStorage.clear()

    // set user back to null
    setUser(null)
    setUsername('')
    setPassword('')

    dispatch(setNotification('successfully logged out','success',5))
  }

  // const updateBlogs = async (id,newBlog) => {
  //   await blogService.update( id, newBlog )
  //   setBlogs(await blogService.getAll())
  // }

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
            <Blog key={blog.id} blog={blog} user={user} deleteBlog={removeBlog} />
          )}
        </div>
      }
    </>

  )
}

export default App