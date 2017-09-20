const restify = require('restify')
const routes = require('../http/routes')
const cors = require('./cors')
const jwt = require('jsonwebtoken')

const server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())

server.use(async (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    res.send(403, { error: 'Access denied' })
    return false
  }

  await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.send(403, { error: 'Token invalid' })
    } else {
      req.decoded = decoded
    }
  })

  next()
})

routes(server)

module.exports = server
