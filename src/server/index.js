const restify = require('restify')
const routes = require('../http/routes')
const cors = require('./cors')

const server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)

routes(server)

module.exports = server
