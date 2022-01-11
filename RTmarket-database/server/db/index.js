// database에 연결 할 connection을 생성한다.
const mysql = require("mysql");
const dotenv = require("dotenv");
const config = require("../config/config");

const con = mysql.createConnection(config[process.env.NODE_ENV || "dev"]); // DB 선택 , 연결

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
