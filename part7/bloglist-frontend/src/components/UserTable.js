import React from 'react'
import UserRow from './UserRow'
import { useSelector } from 'react-redux'



const UserTable = (props) => {
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
                    <UserRow key={user.id} user={user} />
                )}
            </tbody>
        </table>
    )

}


export default UserTable