const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEP = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errHandler = (error, request, response, next) => {
  logger.errorLog(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'not valid id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: error.message,
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
  }
  next()
}

module.exports = {
  unknownEP,
  errHandler,
  tokenExtractor,
  userExtractor,
}
