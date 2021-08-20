import React from 'react'
import User from './User'
import { useSelector } from 'react-redux'



const UserList = (props) => {
    const users = useSelector(state => state.users)

    const byBlogs = (b1, b2) => b2.blogs.length - b1.blogs.length

    return (
        <table>
            <thead>
                <tr>
                    <th> Users </th>
                    <th> blogs created </th>
                </tr>
            </thead>
            <tbody>
                {users.sort(byBlogs).map(user =>
                    <User key={user.id} user={user} />
                )}
            </tbody>
        </table>
    )

}


export default UserList