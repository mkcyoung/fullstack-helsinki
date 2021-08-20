import React, { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'



const BlogList = (props) => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)

    const byLikes = (b1, b2) => b2.likes - b1.likes

    const updateBlogs = async (id,newBlog) => {
        await blogService.update( id, newBlog )
        setBlogs(await blogService.getAll())
      }

    // This should be handled in the reducer 
    const removeBlog = async (blog) => {
        try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(n => n.id !== blog.id))
        dispatch(setNotification(`"${blog.title}" successfully deleted.`,'success',5))
        }
        catch (exception) {
        dispatch(setNotification(exception,'error',5))
        }
    }

    return (
        <div>
            {blogs.sort(byLikes).map(blog =>
                <Blog key={blog.id} blog={blog} user={user} deleteBlog={removeBlog} updateBlogs={updateBlogs}/>
            )}
        </div>
    )

}


export default BlogList
