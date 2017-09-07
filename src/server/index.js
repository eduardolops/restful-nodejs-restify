const restify = require('restify')
const routes = require('../http/routes')
const server = restify.createServer()

routes(server)

module.exports = server
