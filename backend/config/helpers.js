const Mysqli = require('mysqli');
require('dotenv').config();

let conn = new Mysqli({
  Host: process.env.DB_HOST,
  post: process.env.DB_PORT,
  user: process.env.DB_USER,
  passwd: process.env.DB_PASSWORD,
  db: process.env.DB_DATABASE
});
/*
let conn = new Mysqli({
  Host: 'localhost',
  post: 3306,
  user: 'root',
  passwd: 'root',
  db: 'ecommerce'
});
*/

let db = conn.emit(false, '');

module.exports = {
  database: db
};