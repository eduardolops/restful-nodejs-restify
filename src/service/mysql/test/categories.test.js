const test = require('ava')
const { connection, errorHandler } = require('./setup')

const category = require('../categories')({ connection, errorHandler })

test.beforeEach(t => connection.query('TRUNCATE TABLE categories'));
test.after.always(t => connection.query('TRUNCATE TABLE categories'));

test('Create of category', async t => {
  const result = await category.save('category-test')
  t.is(result.category.name, 'category-test')
})
