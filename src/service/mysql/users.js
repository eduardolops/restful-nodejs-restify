
const sha1 = require('sha1')

const users = (dep) => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'SELECT id, email FROM users'
        connection.query(sql, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar as usuários', reject)
            return false
          }
          resolve({ users: results })
        })
      })
    },
    save: (email, password) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'INSERT INTO users (email, password) VALUES (?, ?)'
        connection.query(sql, [email, sha1(password)], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar a usuário ${email}`, reject)
            return false
          }
          resolve({ user: { email, id: results.insertId } })
        })
      })
    },
    update: (id, password) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'UPDATE users SET password = ? WHERE id = ?'
        connection.query(sql, [sha1(password), id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar a usuário do id ${id}`, reject)
            return false
          }
          resolve({ user: { id }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'DELETE FROM users WHERE id = ?'
        connection.query(sql, [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover a usuário de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Usuário removida com sucesso', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = users
