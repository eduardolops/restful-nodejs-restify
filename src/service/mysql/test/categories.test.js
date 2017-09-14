
const test = require('ava')

require('dotenv').config()

const mysqlServer = require('mysql')

const connection = mysqlServer.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE_TEST
})

const errorHandler = (error, msg, rejectFunction) => {
  console.error(error)
  rejectFunction({ error: msg })
}

const category = require('../categories')({ connection, errorHandler })

test('Create of category', async t => {
  const result = await category.save('category-test')
  t.is(result.category.name, 'category-test')
})
