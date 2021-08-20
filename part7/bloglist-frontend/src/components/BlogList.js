import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'



const BlogList = (props) => {
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user )

    const byLikes = (b1, b2) => b2.likes - b1.likes


    return (
        <div>
            {blogs.sort(byLikes).map(blog =>
                <Blog key={blog.id} blog={blog} user={user} />
            )}
        </div>
    )

}


export default BlogList
