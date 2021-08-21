import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async (id) => {
  const response= await axios.get(`${ baseUrl }/${id}`)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${ baseUrl }/${id}`, config)
}

const addComment = async ( id, newBlogComment ) => {
  const request = {
    blogID: id,
    comment: newBlogComment
  }
  const response = await axios.post(`${ baseUrl }/${id}/comments`, request )
  return response.data
}


export default { getAll, getById, create, update, setToken, remove, addComment }