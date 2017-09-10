
const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'restful-ws'
})

const categoryModel = require('./categories')({ connection })

module.exports = {
  categories: () => categoryModel
}
