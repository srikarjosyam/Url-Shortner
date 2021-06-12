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
      const text = `INSERT INTO ${this.table}(${columns}) VALUES($1, $2, $3) RETURNING ${columns}`
      const values = [data.short_url, data.long_url,data.click_count]
      return this.pool.query(text, values, (err, res) => {
        if (err) {
          console.log(err.stack)
          throw err;
        } else {
          console.log(res)
          return res;
        }
      })
  }

  async update(data, conditions) {
    
    //update data object
    const dKeys = Object.keys(data);
    const dataTuples = dKeys.map((k, index) => `${k} = $${index + 1}`);
    const updates = dataTuples.join(", ");
    const len = Object.keys(data).length;

    //condition object
    const keys = Object.keys(conditions);
    const condTuples = keys.map((k, index) => `${k} = $${index + 1 + len} `);
    const condPlaceholders = condTuples.join(" AND ");

    //push the data to value object for query
    const values = [];
    Object.keys(data).forEach(key => {
      values.push(data[key]);
    });
    Object.keys(conditions).forEach(key => {
      values.push(conditions[key]);
    });
    const text = `UPDATE ${this.table} SET ${updates} WHERE ${condPlaceholders}`
    return this.pool.query(text, values, (err, res) => {
      if (err) {
        console.log(err.stack)
        throw err;
      } else {
        console.log(res)
        return res;
      }
    })
  }
}

export default Model;