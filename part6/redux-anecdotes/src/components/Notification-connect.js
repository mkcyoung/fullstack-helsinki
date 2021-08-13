
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.message //useSelector(state => state.notification.message)
  const display = props.display //useSelector(state => state.notification.display)
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

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    display: state.notification.display
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification