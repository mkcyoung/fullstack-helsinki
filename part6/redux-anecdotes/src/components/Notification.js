
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const display = useSelector(state => state.notification.display)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification