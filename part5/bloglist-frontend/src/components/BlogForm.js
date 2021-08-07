import React from 'react'
import Input from './Input'

const BlogForm = ({title,author,url,handleSubmit, handleTitle, handleAuthor, handleUrl}) => (
    <form onSubmit={handleSubmit}>
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
        <button type="submit">create</button>
    </form>
)

export default BlogForm