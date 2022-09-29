import knex from 'knex'

const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'firewall',
  }
})

export default db;