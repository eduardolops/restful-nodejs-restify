
const db = require('../service/mysql')

const routes = (server) => {
  server.get('category', async (req, res, next) => {
    try {
        res.send( await db.categories().all() )
        next()
    } catch {
        res.send( error )
        next()
    }
    
    // db.categories().all().then(categories => {
    //   res.send(categories)
    // }).catch(error => {
    //   res.send(error)
    // })
    // next()
  })

  server.post('category', (req, res, next) => {
    const { name } = req.params
    res.send(name)
    next()
  })

  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence...')
    next()
  })
}

module.exports = routes
