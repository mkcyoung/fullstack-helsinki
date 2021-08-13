
const initialState = {
    message: null,
    display: 'none'
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                message: action.message,
                display: 'block',
            }
        case 'REMOVE_NOTIFICATION':
            return {
                message: null,
                display: 'none'
            }
        default:
            return state
    }
}

export const setNotification = message => {
    return {
      type: 'SET_NOTIFICATION',
      message,
    }
}

export const removeNotification = () => {
    return {
      type: 'REMOVE_NOTIFICATION'
    }
}

export default notificationReducer