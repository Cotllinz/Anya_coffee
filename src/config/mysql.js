const mysql = require('mysql')
require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
})

connection.connect((err) => {
  if (err) {
    throw err
  }
  console.log('Success Conect to database anya_coffeeShop')
})
module.exports = connection
