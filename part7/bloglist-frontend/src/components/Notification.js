import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const category = useSelector(state => state.notification.category)

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    color: category === 'success' ? 'green' : 'red'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification