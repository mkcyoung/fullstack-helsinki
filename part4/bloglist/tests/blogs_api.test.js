const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('get request returns correct amount of blogs in json format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initBlogs.length)
})

test('Verify that the unique identifier is id not _id', async () => {
    const response = await api.get('/api/blogs')
    
    response.body.map(blog => expect(blog.id).toBeDefined())
})

test('Post request successfully creates new blog post', async () => {
    const newBlog = {
        title: 'Alright Alright Alright',
        author: 'Mathew McConaughey',
        url: 'www.mathewmcconaughey.org',
        likes: 100000
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1)
})








afterAll(() => {
    mongoose.connection.close()
})
