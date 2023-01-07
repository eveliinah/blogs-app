import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { getUsers } from '../reducers/usersReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { setUser } from '../reducers/userReducer'

const Menu = ({ user }) => {
  const buttonStyle = {
    marginLeft: 10,
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <Navbar variant="light" bg="light" expand="lg">
      <Container>
        <Navbar.Brand style={{ fontSize: 30, fontWeight: 400 }} href="/">
          BlogsApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Blogs</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
          </Nav>
          <Navbar.Text>
            {user.name} logged in{' '}
            <Button
              variant="outline-secondary"
              style={buttonStyle}
              id="logout"
              onClick={() => {
                window.localStorage.removeItem('loggedUser')
                dispatch(setUser(null))
              }}
            >
              logout
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu
