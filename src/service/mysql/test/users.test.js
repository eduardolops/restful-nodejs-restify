const test = require('ava')
const { connection, errorHandler } = require('./setup')

const user = require('../users')({ connection, errorHandler })

const create = () => user.save('user@test.com', '124334')

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

test('Selected of user', async t => {
  await create()
  const list = await user.all()
  t.is(list.users.length, 1)
})

test('Create of user', async t => {
  const result = await create()
  t.is(result.user.email, 'user@test.com')
})

test('Updated of user', async t => {
  await create()
  const updated = await user.update(1, '123456780')
  t.is(updated.affectedRows, 1)
})

test('Deleted of user', async t => {
  await create()
  const deleted = await user.del(1)
  t.is(deleted.affectedRows, 1)
})
