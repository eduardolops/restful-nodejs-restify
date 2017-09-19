
const users = (dep) => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'SELECT * FROM users'
        connection.query(sql, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar as usuários', reject)
            return false
          }
          resolve({ users: results })
        })
      })
    },
    save: (name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'INSERT INTO users (name) VALUES (?)'
        connection.query(sql, [name], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar a usuário ${name}`, reject)
            return false
          }
          resolve({ user: { name, id: results.insertId } })
        })
      })
    },
    update: (id, name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'UPDATE users SET name = ? WHERE id = ?'
        connection.query(sql, [name, id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar a usuário ${name}`, reject)
            return false
          }
          resolve({ user: { name, id }, affectedRows: results.affectedRows })
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
