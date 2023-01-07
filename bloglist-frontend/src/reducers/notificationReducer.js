import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
  },
})

export const { newNotification } = notificationSlice.actions

let timeoutID
export const setNotification = (message, timeInSeconds, type) => {
  return (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    dispatch(newNotification({ message, type }))

    timeoutID = setTimeout(() => {
      dispatch(newNotification(null))
    }, timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer
