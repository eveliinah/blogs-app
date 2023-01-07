import axios from 'axios'
const baseUrl = '/api/blogs'

const getComments = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)
  return request.then((response) => response.data)
}

const createComment = async (newComment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newComment)
  return response.data
}

export default { createComment, getComments }
