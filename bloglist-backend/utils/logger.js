const infoLog = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const errorLog = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

module.exports = {
  infoLog, errorLog
}