
const initialState = {
    message: null,
    display: 'none',
    timeoutID: null
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                message: action.message,
                display: 'block',
                timeoutID: action.timeoutID
            }
        case 'REMOVE_NOTIFICATION':
            return {
                message: null,
                display: 'none',
                timeoutID: null
            }
        default:
            return state
    }
}

export const setNotification = (message,time) => {
    return async dispatch => {
        const timeoutID = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
              })},
            time * 1000)
        dispatch({
            type: 'SET_NOTIFICATION',
            message,
            timeoutID
          })
        
    }
}

export default notificationReducer