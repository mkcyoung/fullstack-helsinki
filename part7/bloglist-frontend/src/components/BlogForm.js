import React, { useState } from 'react'
import Input from './Input'

import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`A new blog "${blogObject.title}" by "${blogObject.author}" was added.`,'success',5))
    }
    catch (exception) {
      dispatch(setNotification(exception,'error',5))
    }

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <Input
          text='title: '
          name='Title'
          value={title}
          handleChange={handleTitle}
        />
        <Input
          text='author: '
          name='Author'
          value={author}
          handleChange={handleAuthor}
        />
        <Input
          text='url: '
          name='Url'
          value={url}
          handleChange={handleUrl}
        />
        <button id='create-blog-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm