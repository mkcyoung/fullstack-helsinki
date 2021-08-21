import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'

const CommentForm = (props) => {
    const dispatch = useDispatch()

    const [comment, resetComment] = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(addComment(props.blog.id, comment.value))
        resetComment()
    }

    // lets use some custom hooks for the form...
    return (
        <form onSubmit={handleSubmit}>
            <span>
            comment: 
            <input {...comment} />
            </span>
            <button type='submit'>add comment</button>
      </form>
    )
}

export default CommentForm