var skema = require('sequelize')
var mysql = require('mysql')
var koneksi = mysql.createConnection({    
    host:'localhost',
    user:'root',
    password:'',
    database:'login2020',
    multipleStatements:true
})

module.exports.db = koneksi;