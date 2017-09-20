
const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = (dep) => {
  return {
    authenticate: (email, password) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let queryString = 'SELECT id, email FROM users WHERE email = ? and password = ?'
        let queryData = [email, sha1(password)]

        connection.query(queryString, queryData, (error, result) => {
          if (error || !result.length) {
            errorHandler(error, 'Falha ao localizar usuario', reject)
            return false
          }

          const { email, id } = result[0]
          const token = jwt.sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

          resolve({ token })
        })
      })
    }
  }
}

module.exports = auth
