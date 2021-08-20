import React, { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const TogglableBlogForm = () => {

    const blogFormRef = useRef()

    return (
        <div>
            <Togglable buttonLabel="create new blog" ref={blogFormRef} >
                <BlogForm blogFormRef={blogFormRef}/>
            </Togglable>
        </div>
    )
}

export default TogglableBlogForm