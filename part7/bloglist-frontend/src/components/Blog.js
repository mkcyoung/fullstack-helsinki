import React, { useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { updateBlogLikes } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'

import { useHistory } from 'react-router-dom'


const Blog = ({ blog }) => {

  if (!blog){
    return <div>blog has been deleted</div>
  }

  const dispatch = useDispatch()
  const user = useSelector(state => state.user )
  const comments = blog.comments

  const history = useHistory()

  const [likes, setLikes] = useState(blog.likes)

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
      history.push('/')
    }
  }

  const validateText = (str) =>  {
      var tarea = str
      if (tarea.indexOf('http://') !== 0 || tarea.indexOf('https://') !== 0) {
          return `https://${blog.url}`
      }
  }

  return (
    <>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={`${validateText(blog.url)}`}> {blog.url} </a> <br />
      likes: <span id='likes'>{likes}</span> <button onClick={ likeBlog } id='like-button'>like</button> <br />
      {blog.user ? `added by ${blog.user.name}` : 'No user'} <br />
      { blog.user && user.name === blog.user.name ? <button onClick={ removeBlog } id='remove-button'>remove</button> : null }
      <h2>comments</h2>
      <CommentForm blog={blog} />
      <ul>{comments.map((comment,i) => <li key={i} >{comment}</li>)}</ul>
    </>

  )
}

export default Blog