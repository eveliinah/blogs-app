import { Link } from 'react-router-dom'
import '../App.css'
import { useDispatch } from 'react-redux'
import { getComments } from '../reducers/commentsReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    padding: 20,
    border: 'solid',
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 5,
    background: '#F5F5F5',
    color: '#CCCCCC',
  }

  return (
    <div style={blogStyle} className="blog">
      <Link
        className="blog-link"
        key={blog.id}
        to={`/blogs/${blog.id}`}
        onClick={() => {
          dispatch(getComments(blog.id))
        }}
      >
        {blog.title}, by {blog.author}
      </Link>
    </div>
  )
}

export default Blog
