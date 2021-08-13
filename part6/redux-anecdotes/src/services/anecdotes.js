import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const updateVote = async (data) => {
    const newObject = {
        content: data.content,
        votes: data.votes + 1,
        //id: data.id, //maybe I don't need this
    }
    const response = await axios.put(`${baseUrl}/${data.id}`,newObject)
    return response.data
}
  

export default { getAll, createNew, updateVote }