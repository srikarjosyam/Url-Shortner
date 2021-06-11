import { pool } from './pool';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table} `;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async insert(columns, data) {
    let query = `INSERT INTO ${this.table}(${columns}) VALUES (${data}) RETURNING ${columns} `;
    return this.pool.query(query);
  }

  async update(values, clause) {
    let query = `UPDATE ${this.table} SET ${values} WHERE ${clause} `;
    return this.pool.query(query);
  }
}

export default Model;