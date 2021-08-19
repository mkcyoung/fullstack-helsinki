const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    response.json(users)
  })


usersRouter.post('/', async (request, response) => {
  const body = request.body

    // Validating username and password
    if (!body.username || !body.password){
        return response.status(400).send( {error:'no username or password entered' }).end()
    }
    else if (body.username.length < 3){
        return response.status(422).send( {error:'username length less than 3 characters' }).end()
    }
    else if (body.password.length < 3){
        return response.status(422).send( {error:'password length less than 3 characters' }).end()
    }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter