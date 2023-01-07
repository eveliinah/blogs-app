import CreateForm from './CreateForm'
import Togglable from './Togglable'
import Blog from '../components/Blog'
import { useRef } from 'react'
import { addBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = (blogs) => {
  const blogsArray = blogs.blogs
  const dispatch = useDispatch()
  const createFormRef = useRef()

  const createBlog = async (blogObject) => {
    createFormRef.current.toggleVisibility()
    dispatch(addBlog(blogObject))
    dispatch(
      setNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        4
      )
    )
  }

  if (blogsArray.length > 0) {
    return (
      <div className="blogs">
        <Togglable buttonLabel="create new blog" ref={createFormRef}>
          <CreateForm createBlog={createBlog} />
        </Togglable>
        {blogsArray.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  } else {
    return (
      <div className="blogs">
        <Togglable buttonLabel="create new blog" ref={createFormRef}>
          <CreateForm createBlog={createBlog} />
        </Togglable>
      </div>
    )
  }
}

export default Blogs
