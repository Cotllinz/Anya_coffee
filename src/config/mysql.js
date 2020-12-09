const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'anya_coffee',
  timezone: 'UTC'
})

connection.connect((err) => {
  if (err) {
    throw err
  }
  console.log('Success Conect to database anya_coffeeShop')
})
module.exports = connection
