import React, { useState } from 'react'
import Login from './Login'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsername = (event) => {
        setUsername(event.target.value)
      }
    
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(setUser(username,password))
        setUsername('')
        setPassword('')
    }


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