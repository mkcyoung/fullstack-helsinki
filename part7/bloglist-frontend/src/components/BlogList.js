import React from 'react'
// import Blog from './Blog'
import { useSelector } from 'react-redux'
import {
    Link
  } from 'react-router-dom'


const BlogList = (props) => {
    const blogs = useSelector(state => state.blogs)
    // const user = useSelector(state => state.user )

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div>
            {blogs.sort(byLikes).map(blog =>
                <div key={blog.id} style={blogStyle}>
                    <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link>
                </div>
            )}
        </div>
    )

}


export default BlogList
