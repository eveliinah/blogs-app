import commentsService from '../services/comments'
import CommentForm from './CommentForm'
import { deleteB, likeBlog } from '../reducers/blogsReducer'
import Button from 'react-bootstrap/Button'
import { getComments } from '../reducers/commentsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useParams, useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  const user = useSelector((state) => state.user)
  const comments = useSelector((state) => state.comments)

  useEffect(() => {
    if (blog && comments.length < 1) {
      dispatch(getComments(blog.id))
    }
  }, [blog])

  const addLike = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id)
    const liked = {
      ...blogToLike,
      likes: (blogToLike.likes || 0) + 1,
      user: blogToLike.user.id,
    }

    dispatch(likeBlog(liked))
  }

  const deleteBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (
      window.confirm(
        `Do you want to delete blog ${blog.title} by ${blog.author}?`
      )
    ) {
      dispatch(deleteB(id))

      dispatch(
        setNotification(`Blog ${blog.title} by ${blog.author} deleted`, 4)
      )

      navigate('/')
    }
  }

  const createComment = async (comment) => {
    await commentsService.createComment(comment, blog.id)
    dispatch(getComments(blog.id))
  }

  if (!comments || !blog || !user || blog.user.name === '') {
    return null
  }

  const commentsToShow =
    comments.length > 0 ? (
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <Card.Subtitle>Comments:</Card.Subtitle>
        </ListGroupItem>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
        ))}
      </ListGroup>
    ) : (
      <i>no comments yet...</i>
    )

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }

  const cardStyle = {
    width: '22rem',
    display: 'block',
    marginTop: 20,
    marginRight: 20,
  }

  return (
    <div style={containerStyle}>
      <Card style={cardStyle} border="secondary">
        <Card.Body>
          <Card.Header>
            <Card.Title>
              {blog.title} {blog.author}
            </Card.Title>
          </Card.Header>
          <br></br>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
          <Card.Text style={{ marginTop: 15 }}>likes {blog.likes}</Card.Text>
          <Button
            style={{ width: 80 }}
            onClick={() => addLike(blog.id)}
            variant="light"
          >
            Like
          </Button>
        </Card.Body>
        <Card.Body></Card.Body>
      </Card>
      <Card border="secondary" style={cardStyle}>
        <Card.Body>
          <CommentForm blog={blog.id} createComment={createComment} />
        </Card.Body>
        <Card.Body>
          <p>{blog.user.name}</p>
          {user.name === blog.user.name ? (
            <Button
              style={{ width: 80 }}
              variant="light"
              id="delete"
              onClick={() => deleteBlog(blog.id)}
            >
              delete
            </Button>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
      <Card border="secondary" style={cardStyle}>
        <Card.Body>{commentsToShow}</Card.Body>
      </Card>
    </div>
  )
  // return (
  //   <div>
  //     <h2>
  //       {blog.title} {blog.author}
  //     </h2>
  //     <Nav.Link href={blog.url}>{blog.url}</Nav.Link>
  //     likes {blog.likes}
  //     <Button variant="light" onClick={() => addLike(blog.id)}>
  //       like
  //     </Button>
  //     <h5>Comments:</h5>
  //     {commentsToShow}
  //     <CommentForm blog={blog.id} createComment={createComment} />
  //     <p>{blog.user.name}</p>
  //     {user.name === blog.user.name ? (
  //       <Button variant="light" id="delete" onClick={() => deleteBlog(blog.id)}>
  //         delete
  //       </Button>
  //     ) : (
  //       <></>
  //     )}
  //   </div>
  // )
}

export default BlogDetails
