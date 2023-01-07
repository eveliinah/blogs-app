import PropTypes from 'prop-types'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

const LogForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const buttonStyle = {
    marginLeft: 2,
    marginTop: 15,
    width: 80,
  }

  const inputStyle = {
    marginLeft: 5,
    marginTop: 7,
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: 20 }}>
          username
          <input
            id="username"
            style={inputStyle}
            type="text"
            autoComplete="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            style={inputStyle}
            type="password"
            autoComplete="current-password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="light" id="logB" type="submit" style={buttonStyle}>
          login
        </Button>
      </form>
    </div>
  )
}

LogForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LogForm
