
const routes = (server) => {
  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence...')
    next()
  })

  server.get('category', (req, res, next) => {
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
}

module.exports = routes
