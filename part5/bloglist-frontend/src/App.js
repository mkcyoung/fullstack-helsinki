import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
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
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
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
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("error",exception)
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const handleLogout = () => {
    console.log("logging out",user.username)
    // clear storage
    window.localStorage.clear()
    // set user back to null
    setUser(null)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      {user === null ?
        <div>
          <h2>Log in to application</h2> 
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