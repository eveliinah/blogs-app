import 'bootstrap'
import { useEffect } from 'react'
import blogService from './services/blogs'
import login from './services/login'
import Notification from './components/Notification'
import LogForm from './components/LoginForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import Menu from './components/Menu'
import RoutesComponent from './components/RoutesComponent'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    await login
      .login({ username, password })
      .then((user) => {
        dispatch(setUser(user))
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        dispatch(setNotification(`${user.name} logged in`, 4))
      })
      .catch(() => {
        dispatch(setNotification('Wrong username or password', 4, 'alert'))
      })
  }

  if (user === null) {
    return (
      <div className="container">
        <h2 style={{ marginTop: 40 }}>Log in to Blog-application</h2>
        <Notification />
        <LogForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <Menu user={user} />
        <Notification />
        <RoutesComponent blogs={blogs} />
      </Router>
    </div>
  )
}

export default App
