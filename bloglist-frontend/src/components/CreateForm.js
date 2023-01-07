import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

const CreateForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setAuthor('')
    setUrl('')
    setTitle('')
  }

  const buttonStyle = {
    marginLeft: 2,
    marginTop: 15,
  }

  const inputStyle = {
    marginLeft: 5,
    marginTop: 7,
  }

  return (
    <div style={{ marginTop: 30 }}>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            style={inputStyle}
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
            placeholder="type blog's title"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            style={inputStyle}
            type="author"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
            placeholder="type blog's author"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            style={inputStyle}
            type="url"
            value={url}
            name="Url"
            onChange={handleUrlChange}
            placeholder="type blog's url"
          />
        </div>
        <Button variant="light" id="create" style={buttonStyle} type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}
export default CreateForm
