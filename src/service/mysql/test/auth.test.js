const test = require('ava')
const { connection, errorHandler } = require('./setup')

const user = require('../users')({ connection, errorHandler })
const auth = require('../auth')({ connection, errorHandler })

const create = () => user.save('user@test.com', '124334')

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

test('authenticate of user - success', async t => {
  await create()
  const result = await auth.authenticate('user@test.com', '124334')
  t.not(result.token, null)
  t.not(result.token.length, 0)
})

test('authenticate of user - fail', async t => {
  await create()
  const promise = auth.authenticate('user2@test.com', '124334')
  const error = await t.throws(promise)
  t.is(error.error, 'Falha ao localizar usuario')
})
