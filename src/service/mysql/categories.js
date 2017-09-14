
const categories = (dep) => {
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'SELECT * FROM categories'
        connection.query(sql, (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar as categorias', reject)
            return false
          }
          resolve({ categories: results })
        })
      })
    },
    save: (name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'INSERT INTO categories (name) VALUES (?)'
        connection.query(sql, [name], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar a categoria ${name}`, reject)
            return false
          }
          resolve({ category: { name, id: results.insertId } })
        })
      })
    },
    update: (id, name) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'UPDATE categories SET name = ? WHERE id = ?'
        connection.query(sql, [name, id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao atualizar a categoria ${name}`, reject)
            return false
          }
          resolve({ category: { name, id }, affectedRows: results.affectedRows })
        })
      })
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = dep
        let sql = 'DELETE FROM categories WHERE id = ?'
        connection.query(sql, [id], (error, results) => {
          if (error || !results.affectedRows) {
            errorHandler(error, `Falha ao remover a categoria de id ${id}`, reject)
            return false
          }
          resolve({ message: 'Categoria removida com sucesso', affectedRows: results.affectedRows })
        })
      })
    }
  }
}

module.exports = categories
