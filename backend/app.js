const express = require("express");
const connection = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");


const port = 9090;
const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Enable CORS for your app
app.use(cors());




//  user signup

app.post("/usersignup", async (req, res) => {
    const { name, email, password } = req.body;
   
  
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    try {
      const query1 = "SELECT * FROM user WHERE email = ? ";
      const [results] = await connection.execute(query1, [email]);
      if (results.length == 0) {
        const query =
          "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
  
        // Use the connection from the pool to execute the query
        const [result] = await connection.execute(query, [
          name,
          email,
          password,
       
        ]);
        res
          .json({ message: "Entry created successfully", id: result.insertId })
          .status(200);
      } else {
        res.json({ message: "This Email Already Registerd" });
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the entry" });
    }
  });
  
  app.post("/getuserlogin", async (req, res) => {
    const { useremail, userpassword } = req.body;
  
    try {
      const query = "SELECT * FROM user WHERE email = ? AND password = ?";
  
      // Use the connection from the pool to execute the query
      const [results] = await connection.execute(query, [
        useremail,
        userpassword,
      ]);
  
      if (results.length === 0) {
        // No user found with the provided email
        res.status(200).json({ message: "email not found" });
      } else {
        // User with the provided email found
        res.status(200).json({ data: results, message: "This user is present" });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  });
  
  app.get("/getuserdata", async (req, res) => {
    try {
      const { email } = req.query;
  
      const sql = "SELECT * FROM user WHERE email = ?";
      const [result] = await connection.execute(sql, [email]);
  
      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Assuming you want to return the first matching user if multiple users have the same email
      res.json(result[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({
        error: "An error occurred while fetching user data",
        message: error.message,
      });
    }
  });
  


  app.listen(port, () => {
    try {
      console.log(`Server is running on ${port}`);
    } catch (error) {
      console.log("server not running");
    }
  });