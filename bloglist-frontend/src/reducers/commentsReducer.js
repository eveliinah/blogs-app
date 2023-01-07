import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
  },
})

export const getComments = (id) => {
  return async (dispatch) => {
    const comments = await commentService.getComments(id)
    dispatch(setComments(comments))
  }
}

export const { setComments } = commentsSlice.actions
export default commentsSlice.reducer
