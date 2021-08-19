import blogService from '../services/blogs'


// action creator for liking
export const like = (blog) => {
    return async dispatch => {
      dispatch({
        type:'LIKE',
        data: blog
      })
      await blogService.update(blog)
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
            const newBlog = {
              title: action.data.title,
              author: action.data.author,
              url: action.data.url,
              likes: action.data.likes
            }
            return [...state, newBlog]
          }
        case 'INIT':
            return action.data
        case 'LIKE':{
            const blogToChange = action.data
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1
            }
            return state.map(a => a.id === blogToChange.id ? changedBlog : a)
        }
        default:
            return state
    }
}


export default blogReducer