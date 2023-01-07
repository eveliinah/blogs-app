const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = config.PORT || 8080
server.listen(PORT, () => {
  logger.infoLog(`Server running on port ${PORT}`)
})
