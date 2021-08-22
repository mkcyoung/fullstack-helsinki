import React, { useEffect } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import TogglableBlogForm from './components/TogglableBlogForm'
import UserTable from './components/UserTable'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

import { initializeBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/usersReducer'
import { getCurrentUser } from './reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

import {
  Switch, Route,
  useRouteMatch
} from 'react-router-dom'


const App = () => {

  const dispatch = useDispatch()

  // init blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const blogs = useSelector(state => state.blogs)

  // init users
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  const users = useSelector(state => state.users)

  // Retrieve current user if there is one
  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])
  // set current user by retrieving from store
  const user = useSelector(state => state.user )

  const findById = (arr,id) => {
    return arr.find(a => a.id === id)
  }

  // finds user with id that matches the route url 
  const matchUser = useRouteMatch('/users/:id')
  const clickedUser = matchUser
    ? findById(users,matchUser.params.id)
    : null

  // finds blog with id that matches the route url 
  const matchBlog = useRouteMatch('/blogs/:id')
  const clickedBlog = matchBlog
    ? findById(blogs,matchBlog.params.id)
    : null


  return (
    <>
      {user === null ?
        <div>
          <h1 align='center'>Log in to application</h1>
          <Notification />
          <LoginForm />
        </div> :
        <>
          <Menu />
          <Notification />
          <h2>blogs</h2>
          <Switch>
            <Route path='/blogs/:id'>
              <Blog blog={clickedBlog}/>
            </Route>
            <Route path='/users/:id'>
              <User user={clickedUser}/>
            </Route>
            <Route path='/users'>
              <UserTable />
            </Route>
            <Route path='/'>
              <div>
                <TogglableBlogForm />
                <BlogList />
              </div>
            </Route>
        </Switch>

      </>
        
      }
    </>

  )
}

export default App