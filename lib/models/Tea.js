const pool = require('../utils/pool');

module.exports = class Tea {
  id;
  name;
  category;
  quantity;
  origin;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.category = row.category;
    this.quantity = row.quantity;
    this.origin = row.origin;
  }

  static async insert(tea) {
    const { rows } = await pool.query(
      'INSERT INTO teas (name, category, quantity, origin) VALUES ($1, $2, $3, $4) RETURNING *', [tea.name, tea.category, tea.quantity, tea.origin]
    )

    return new Tea(rows[0]);
  };

  static async getAll() {
    const data = await pool.query(
      'SELECT * FROM teas'
    )
    return data.rows;
  }

  static async getById(id) {
    const data = await pool.query(
      'SELECT * from teas WHERE id = $1', [id]
    )
    return data.rows[0]
  }

  static async removeTea(id) {
    const data = await pool.query(
      'DELETE from teas WHERE id=$1 RETURNING *', [id]
      );
      return data.rows[0];
  }

  static async editQty(id, quantity) {
  const data = await pool.query('UPDATE teas SET quantity=$1 WHERE id=$2 RETURNING *', [quantity, id])
  return data.rows[0]
  }
  
}
