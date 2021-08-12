import React, { useState } from 'react'
import Input from './Input'

const BlogForm = ({ createBlog }) => {

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

  // need to figure out how to properly implement this guy
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    createBlog(blogObject)

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