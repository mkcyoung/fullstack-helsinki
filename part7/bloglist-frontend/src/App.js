import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'

import { useDispatch, useSelector } from 'react-redux'


const App = () => {

  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(initializeAnecdotes())
  // }, [dispatch])

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // init blogs and get their states using dispatch and selector .. .. .. 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // This feels stupid, examine model solution to see how they did it
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  // this is passed to the BlogForm component
  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      const updatedBlog = await blogService.getById(newBlog.id)
      setBlogs(blogs.concat(updatedBlog))

      dispatch(setNotification(`A new blog "${newBlog.title}" by "${newBlog.author}" was added.`,'success',5))
    }
    catch (exception) {
      dispatch(setNotification(exception,'error',5))
    }
  }

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

  const updateBlogs = async (id,newBlog) => {
    await blogService.update( id, newBlog )
    setBlogs(await blogService.getAll())
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
            <BlogForm createBlog={addBlog} />
          </Togglable>

          {blogs.sort(byLikes).map(blog =>
            <Blog key={blog.id} blog={blog} user={user} deleteBlog={removeBlog} updateBlogs={updateBlogs}/>
          )}
        </div>
      }
    </>

  )
}

export default App