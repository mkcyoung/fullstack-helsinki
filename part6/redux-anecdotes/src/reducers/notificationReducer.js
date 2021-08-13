
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

export const setNotification = (message,time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message,
          })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
              })},
            time * 1000)
    }
}

export default notificationReducer