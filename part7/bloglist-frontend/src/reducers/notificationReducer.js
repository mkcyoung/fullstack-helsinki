const initialState = {
    message: null,
    category: null
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {
                message: action.message,
                category: action.category
            }
        case 'REMOVE_NOTIFICATION':
            return {
                message: null,
                category: null
            }
        default:
            return state
    }
}

let timeOutId

export const setNotification = (message,category,time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message,
            category
            })

        if (timeOutId) {
            clearTimeout(timeOutId)
        }

        timeOutId = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, time * 1000 )
        
    }
}

export default notificationReducer