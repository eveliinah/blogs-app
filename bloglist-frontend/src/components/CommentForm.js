import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const CommentForm = ({ createComment, blog }) => {
  const [content, setContent] = useState('')

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()

    createComment({
      content: content,
      blog: blog,
    })

    setContent('')
  }

  const buttonStyle = {
    marginLeft: 2,
    marginTop: 10,
    width: 80,
  }

  const inputStyle = {
    marginLeft: 5,
    marginTop: 7,
  }

  return (
    <div>
      <Card.Subtitle style={{ marginTop: 5 }}>Add new comment:</Card.Subtitle>
      <form style={{ marginTop: 14 }} onSubmit={addComment}>
        <div>
          comment:
          <input
            id="comment"
            style={inputStyle}
            type="text"
            value={content}
            name="Comment"
            onChange={handleContentChange}
            placeholder="type comment"
          />
        </div>
        <Button variant="light" id="create" style={buttonStyle} type="submit">
          add
        </Button>
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  blog: PropTypes.string.isRequired,
}
export default CommentForm
