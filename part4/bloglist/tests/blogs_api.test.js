const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const _ = require('lodash')




describe('testing basic backend functionality', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initBlogs)
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
    
        await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initBlogs.length + 1)
    })
    
    test('Likes initialize to 0 if none are provided', async () => {
    
        const response = await api
            .post('/api/blogs')
            .send(helper.blogWithNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        expect(response.body.likes).toBe(0)
    })
    
    test('if missing title or url, we get a 400 status code returned', async () => {
    
        await api
            .post('/api/blogs')
            .send(helper.blogWithNoTitle)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        await api
            .post('/api/blogs')
            .send(helper.blogWithNoUrl)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initBlogs.length)
    
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })


  })


  


afterAll(() => {
    mongoose.connection.close()
})
