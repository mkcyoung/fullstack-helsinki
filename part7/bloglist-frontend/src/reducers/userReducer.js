import blogService from '../services/blogs'
import loginService from '../services/login'

import { setNotification } from '../reducers/notificationReducer'

export const getCurrentUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch({
                type: 'STORE_USER',
                data: user
            })
            blogService.setToken(user.token)
        }
      }
}

export const setUser = ( username, password ) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
            username, password,
            })
    
            window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
            )
    
            blogService.setToken(user.token)
            dispatch({
                type: 'STORE_USER',
                data: user
            })
            dispatch(setNotification(`${user.username} logged in`,'success',5))
          } catch (exception) {
            dispatch(setNotification('Wrong credentials','error',5))
          }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch({
            type: 'LOGOUT'
        })
        dispatch(setNotification('successfully logged out','success',5))
    }
}


// storing info about the signed in user
const userReducer = (state = null, action ) => {
    switch(action.type){
        case 'STORE_USER':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }

}

export default userReducer