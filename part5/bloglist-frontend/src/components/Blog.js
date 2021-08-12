import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, user, deleteBlog }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleBlog = () => {
    setVisible(!visible)
  }

  const likeBlog = async () => {

    const newBlog = {
      // user: blog.user ? blog.user.id : 'No user',
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    if (blog.user) {
      newBlog.user = blog.user.id
    }
    await blogService.update( blog.id, newBlog )

    setLikes(likes + 1)
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to remove ${blog.title}?`)){
      deleteBlog(blog)
    }
  }

  return (
    <>
      {visible ?
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author}
            <button onClick={ toggleBlog }>hide</button>
          </div>
          <div>
            {blog.url} <br />
            likes: {likes} <button onClick={ likeBlog }>like</button> <br />
            {blog.user ? blog.user.name : 'No user'} <br />
            { blog.user && user.name === blog.user.name ? <button onClick={ removeBlog }>remove</button> : 'butt' }
          </div>
        </div> :
        <div style={blogStyle}>
          <div>
            {blog.title} {blog.author}
            <button onClick={ toggleBlog }>view</button>
          </div>
        </div>
      }
    </>

  )
}

export default Blog