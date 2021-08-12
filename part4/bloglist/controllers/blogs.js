const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
const middleware = require('../utils/middleware')
const logger = require('../utils/logger')
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
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
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
        response.status(204).end()
    }

    // await Blog.findByIdAndRemove(request.params.id)
    // response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const updatedBlog = request.body

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true, runValidators: true, context: 'query' })
    response.status(204).end()
})


module.exports = blogsRouter