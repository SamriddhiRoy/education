const mysql = require("mysql2");

//  const pool = mysql.createConnection({
//    host: 'localhost',
//    user: 'prabisha', // Replace with your MySQL username
//   password: 'Prabisha@2024!', // Replace with your MySQL password
//   database: "prabisha_hospital_management",
//   connectionLimit: 10,
//  });
const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "education_database",
  connectionLimit: 10,
});

const connection = pool.promise();

module.exports = connection;