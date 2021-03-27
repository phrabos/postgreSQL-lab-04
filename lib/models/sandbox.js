const pool = require('../utils/pool');

module.exports = class Orders {
  id;
  quantity;
  item;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
    this.item = row.item;
      
  }

  static async getById(id) {
    const data = await pool.query(
      'SELECT * from teas WHERE id = $1', [id]
    )
    return data.rows[0]
  }

}