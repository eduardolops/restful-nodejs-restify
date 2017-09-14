const test = require('ava')
const { connection, errorHandler } = require('./setup')

const category = require('../categories')({ connection, errorHandler })

const create = () => category.save('category-test')

test.beforeEach(t => connection.query('TRUNCATE TABLE categories'))
test.after.always(t => connection.query('TRUNCATE TABLE categories'))

test('Selected of category', async t => {
  await create()
  const list = await category.all()
  t.is(list.categories.length, 1)
})

test('Create of category', async t => {
  const result = await create()
  t.is(result.category.name, 'category-test')
})

test('Updated of category', async t => {
  await create()
  const updated = await category.update(1, 'category-test-updated')
  t.is(updated.category.name, 'category-test-updated')
  t.is(updated.affectedRows, 1)
})

test('Deleted of category', async t => {
  await create()
  const deleted = await category.del(1)
  t.is(deleted.affectedRows, 1)
})
