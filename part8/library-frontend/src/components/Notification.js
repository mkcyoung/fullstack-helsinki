import React from 'react'

const Notification = ( {message} ) => {

    if ( !message ) {
        return null
    }

    const style = {
        color: 'red',
        padding: 5,
        border: 'solid',
        borderWidth: 1
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification