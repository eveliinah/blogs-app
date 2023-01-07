import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const sort = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      return sort([...state, action.payload])
    },
    updateBlogs(state, action) {
      const blog = action.payload
      return sort(state.map((b) => (b.id === blog.id ? blog : b)))
    },
    deleteBlog(state, action) {
      return sort(state.filter((b) => b.id !== action.payload))
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(sort(blogs)))
  }
}

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogsService.createBlog(blogObject)
    dispatch(createBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogsService.updateBlog(blog, blog.id)
    dispatch(updateBlogs(updatedBlog))
  }
}

export const deleteB = (id) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const { setBlogs, createBlog, updateBlogs, deleteBlog } =
  blogsSlice.actions
export default blogsSlice.reducer
