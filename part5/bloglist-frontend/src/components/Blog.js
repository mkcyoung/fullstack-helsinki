import React, { useState } from 'react'


const Blog = ({blog}) => {

  const [visible, setVisible] = useState(false)

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


  return (
    <>
      {visible ?
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} 
          <button onClick={toggleBlog}>hide</button>
        </div>
        <div>
          {blog.url} <br />
          likes: {blog.likes} <button>like</button> <br />
          {blog.user ? blog.user.name : "No user"}
        </div>
      </div> :
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} 
          <button onClick={toggleBlog}>view</button>
        </div>
      </div>  
    } 
    </>

  )
}

export default Blog