import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  // Notification state
  const [notification, setNotification] = useState([null,'error'])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
      setNotification([`A new blog "${newBlog.title}" by "${newBlog.author}" was added.`,'success'])
      setTimeout(() => {
        setNotification([null,'error'])
      }, 2000)
    }
    catch (exception) {
      setNotification([exception,'error'])
      setTimeout(() => {
        setNotification([null,'error'])
      }, 2000)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(n => n.id !== blog.id))
      setNotification([`"${blog.title}" successfully deleted.`,'success'])
      setTimeout(() => {
        setNotification([null,'error'])
      }, 2000)
    }
    catch (exception) {
      setNotification([exception,'error'])
      setTimeout(() => {
        setNotification([null,'error'])
      }, 2000)
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
      setNotification([`${user.username} logged in`,'success'])
      setTimeout(() => {
        setNotification([null,'error'])
      }, 2000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification(['Wrong credentials','error'])
      setTimeout(() => {
        setNotification([null,'error'])
      }, 2000)
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

    setNotification(['successfully logged out','success'])
    setTimeout(() => {
      setNotification([null,'error'])
    }, 2000)
  }

  const updateBlogs = async () => {
    setBlogs(await blogService.getAll())
  }

  return (
    <>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification message={notification[0]} notificationType={notification[1]}/>
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
          <Notification message={notification[0]} notificationType={notification[1]}/>
          <p>{user.name} logged-in
            <button onClick={() => handleLogout()}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef} >
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} deleteBlog={removeBlog} updateBlogs={updateBlogs}/>
          ).sort( (a, b) => b.props.blog.likes - a.props.blog.likes )}
        </div>
      }
    </>

  )
}

export default App