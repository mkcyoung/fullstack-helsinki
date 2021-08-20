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

  export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT',
        data: blogs
      })
    }
  }


const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD':{
            return [...state, action.data]
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
        default:
            return state
    }
}


export default blogReducer