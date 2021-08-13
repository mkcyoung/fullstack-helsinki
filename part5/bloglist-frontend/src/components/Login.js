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
        name='Username'
        value={username}
        handleChange={handleUsername}
      />
      <Input
        text='password'
        name='Password'
        value={password}
        handleChange={handlePassword}
      />
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

export default Login