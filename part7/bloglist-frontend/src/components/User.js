import React from 'react'



const User = ({ user }) => {

    return (
        <div>
            {user.name} {user.blogs.length}
        </div>
    )

}


export default User