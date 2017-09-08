
const categories = require('../service/mysql')

const routes = (server) => {
  server.get('category', (req, res, next) => {
    categories.then(categories => console.log(categories)).catch(error => console.error(error))
    res.send([1, 'asas'])
    next()
  })

  server.post('category', (req, res, next) => {
    const { name } = req.params
    res.send(name)
    next()
  })

//   server.put('category', (req, res, next) => {
//     res.send('category')
//     next()
//   })

//   server.delete('category', (req, res, next) => {
//     res.send('category')
//     next()
//   })

  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence...')
    next()
  })
}

module.exports = routes
