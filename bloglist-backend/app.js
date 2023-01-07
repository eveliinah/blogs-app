const config = require('./utils/config')
const express = require('express')
const path = require('path')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const morgan = require('morgan')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.infoLog('connected to MongoDB')
  })
  .catch((error) => {
    logger.errorLog('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static('build'))
app.get('/users*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.use(express.json())

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
morgan.token('body', (request) => JSON.stringify(request.body))

app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', commentsRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEP)
app.use(middleware.errHandler)

module.exports = app
