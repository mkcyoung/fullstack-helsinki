const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
const middleware = require('../utils/middleware')
// const logger = require('../utils/logger')
// const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog
        .findById(request.params.id).populate('user', {username: 1, name: 1})
    response.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body

    // const token = request.token
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    // if (!token || !decodedToken.id) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }
    // const user = await User.findById(decodedToken.id)
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author || '',
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    const updatedBlog = await Blog
        .findById(savedBlog._id).populate('user', {username: 1, name: 1})
    user.blogs = user.blogs.concat(savedBlog._id)
    // user.populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    await user.save()

    response.status(201).json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request,response,next) => {
    // const token = request.token
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    // if (!token || !decodedToken.id) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }
    // const user = await User.findById(decodedToken.id)
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if ( blog.user.toString() === user._id.toString() ){
        blog.remove()
        user.blogs = user.blogs.filter( (id) => id.toString() !== request.params.id.toString()) //removes blog from user list
        await user.save()
        response.status(204).end()
    }
    

    // await Blog.findByIdAndRemove(request.params.id)
    // response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const updatedBlog = request.body

    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true, runValidators: true, context: 'query' })
    response.status(204).json(returnedBlog).end()
})

// adding comment functionality -> maybe a put is more appropriate?
blogsRouter.post('/:id/comments',  async (request, response, next) => {
    
    const blogID = request.body.blogID
    const comment = request.body.comment

    const targetBlog = await Blog
        .findById(blogID)
    
    targetBlog.comments = targetBlog
        .comments
        .concat(comment)
    
    await targetBlog.save()
    response.status(201).json(targetBlog.comments)

})

module.exports = blogsRouter