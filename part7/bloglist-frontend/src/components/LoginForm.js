import React, { useState } from 'react'
// import Login from './Login'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

import { Form, Input, Button, Checkbox, Row } from 'antd'

const LoginForm = () => {
    const dispatch = useDispatch()

    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    

    // const handleUsername = (event) => {
    //     setUsername(event.target.value)
    //   }
    
    // const handlePassword = (event) => {
    //     setPassword(event.target.value)
    // }

    const handleLogin = async (values) => {
        dispatch(setUser(values.username,values.password))
        // setUsername('')
        // setPassword('')
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }


    return (
        <Row type="flex" justify="center" align="center">
            <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </Row>
        
        // <div>
        //     <Login
        //         username={username}
        //         password={password}
        //         handleSubmit={handleLogin}
        //         handleUsername={handleUsername}
        //         handlePassword={handlePassword}
        //   />
        // </div>
    )


}

export default LoginForm