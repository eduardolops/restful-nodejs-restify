
const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE
})

const errorHandler = (error, msg, rejectFunction) => {
  console.error(error)
  rejectFunction({ error: msg })
}

const categoryModel = require('./categories')({ connection, errorHandler })
const userModel = require('./users')({ connection, errorHandler })
const authModel = require('./auth')({ connection, errorHandler })

module.exports = {
  categories: () => categoryModel,
  users: () => userModel,
  auth: () => authModel
}
