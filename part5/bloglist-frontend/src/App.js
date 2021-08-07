import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // Really not sure if I need this...
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') 

  const [notification, setNotification] = useState([null,'error'])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // noteService.setToken(user.token)
    }
  }, [])

  // This feels stupid, examine model solution to see how they did it
  const handleUsername = (event) => {
    setUsername(event.target.value)
  }  

  const handlePassword = (event) => {
    setPassword(event.target.value)
  } 

  const handleTitle = (event) => {
    setTitle(event.target.value)
  } 

  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  } 

  const handleUrl = (event) => {
    setUrl(event.target.value)
  } 

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }
  
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification([`A new blog "${title}" by "${author}" was added.`,'success'])
      setTimeout(() => {
        setNotification([null,'error'])
      }, 2000)

      setTitle('')
      setAuthor('')
      setUrl('')
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
        'loggedNoteappUser', JSON.stringify(user)
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
    console.log("logging out",user.username)
    // clear storage
    window.localStorage.clear()

    // set user back to null
    setUser(null)
    setUsername('')
    setPassword('')

    setNotification([`successfully logged out`,'success'])
      setTimeout(() => {
        setNotification([null,'error'])
      }, 2000)
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
          <h2>create new</h2>
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleSubmit={addBlog}
            handleTitle={handleTitle}
            handleAuthor={handleAuthor}
            handleUrl={handleUrl}
          />
          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </>
    
  )
}

export default App