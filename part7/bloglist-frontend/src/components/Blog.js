import React, { useState } from 'react'
import { useDispatch  } from 'react-redux'
import { updateBlogLikes } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'


const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

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
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }
    if (blog.user) {
      newBlog.user = blog.user.id
    }
    setLikes(likes + 1)
    dispatch(updateBlogLikes(newBlog))

  }

  const removeBlog = async (event) => {
    event.preventDefault()
    if (window.confirm(`Are you sure you want to remove ${blog.title}?`)){
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification(`the blog ${blog.title} was successfully deleted`,'success',5))
    }
  }

  return (
    <>
      {visible ?
        <div style={blogStyle} className='blog'>
          <div className='defaultInfo'>
            {blog.title} {blog.author}
            <button onClick={ toggleBlog }>hide</button>
          </div>
          <div className='moreInfo'>
            {blog.url} <br />
            likes: <span id='likes'>{likes}</span> <button onClick={ likeBlog } id='like-button'>like</button> <br />
            {blog.user ? blog.user.name : 'No user'} <br />
            { blog.user && user.name === blog.user.name ? <button onClick={ removeBlog } id='remove-button'>remove</button> : null }
          </div>
        </div> :
        <div style={blogStyle} className='blog'>
          <div className='defaultInfo'>
            {blog.title} {blog.author}
            <button onClick={ toggleBlog } id='view-button'>view</button>
          </div>
        </div>
      }
    </>

  )
}

export default Blog