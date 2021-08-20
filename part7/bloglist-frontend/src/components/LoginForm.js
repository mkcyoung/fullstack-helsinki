import React, { useState } from 'react'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'

import loginService from './services/login'


const LoginForm = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username, password,
          })
    
          window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
          )
    
          blogService.setToken(user.token)
          setUser(user)
          dispatch(setNotification(`${user.username} logged in`,'success',5))
          setUsername('')
          setPassword('')
        } catch (exception) {
          dispatch(setNotification('Wrong credentials','error',5))
        }
    
        console.log('logging in with', username)
      }
    
    // const handleLogout = () => {
    //     console.log('logging out',user.username)
    //     // clear storage
    //     window.localStorage.clear()

    //     // set user back to null
    //     setUser(null)
    //     setUsername('')
    //     setPassword('')

    //     dispatch(setNotification('successfully logged out','success',5))
    // }



    return (
        <div>
            <Login
                username={username}
                password={password}
                handleSubmit={handleLogin}
                handleUsername={handleUsername}
                handlePassword={handlePassword}
          />
        </div>
    )


}

export default LoginForm