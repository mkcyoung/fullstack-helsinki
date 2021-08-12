import React from 'react'
import Input from './Input'

const Login = ({
    username, 
    password, 
    handleSubmit, 
    handleUsername, 
    handlePassword
    }) => {
    return (
    <form onSubmit={handleSubmit}>
        <Input 
            text='username'
            name='Usernmae'
            value={username}
            handleChange={handleUsername}
        />
        <Input 
            text='password'
            name='Password'
            value={password}
            handleChange={handlePassword}
        />
        <button type="submit">login</button>
    </form>
    )
}

export default Login