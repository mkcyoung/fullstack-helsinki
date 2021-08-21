import blogService from '../services/blogs'


// action creator for liking
export const updateBlogLikes = (blog) => {
    return async dispatch => {
        dispatch({
            type:'LIKE',
            id: blog.id
        })
        await blogService.update(blog.id,blog)
    }
  }

// action creator for creating a new blog
export const createBlog = data => {
    return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
        type: 'ADD',
        data: newBlog,
        })
    }
  }

  // action creator for deleting new blog
  export const deleteBlog = id => {
      return async dispatch => {
      const newBlog = await blogService.remove(id)
      dispatch({
          type: 'REMOVE',
          id: id
          })
      }
  }

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const addComment = (id, newBlogComment) => {
  return async dispatch => {
    const comments = await blogService.addComment(id, newBlogComment)
    dispatch({
      type: 'ADD_COMMENT',
      id: id,
      comments: comments
    })
  }
}


const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD':{
            return [...state, action.data]
          }
        case 'ADD_COMMENT':{
          const comments = action.comments
          const blogToChange = state.find( a => a.id === action.id)
          const changedBlog = {
            ...blogToChange,
            comments: comments
          }
          return state.map(a => a.id === action.id ? changedBlog : a)
        }
        case 'INIT':
            return action.data
        case 'LIKE':{
            const blogToChange = state.find( a => a.id === action.id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1
            }
            return state.map(a => a.id === action.id ? changedBlog : a)
        }
        case 'REMOVE':{
            return state.filter( a => a.id !== action.id )
        }
        default:
            return state
    }
}


export default blogReducer