const express = require("express");
const sql = require("mssql");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());


const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  options: {
    encrypt: true, // For Azure connections
    trustServerCertificate: true, // For local development
  },
};

sql
  .connect(config)
  .then((pool) => {
    // console.log("Connected to database");

    app.get("/neighborhood/:name", async (req, res) => {
      const neighborhood = req.params.name;

      // console.log("Neighborhood received:", neighborhood);

      try {
        const query1 = `SELECT * FROM [المعلومات الديموغرافية في حي ${neighborhood}]`;
        // console.log("Executing Query 1:", query1);
        const result1 = await pool.request().query(query1);
        // console.log("Result 1 fetched:", result1.recordset);
        // Debugging: Log the constructed queries
        const query2 = `SELECT * FROM [السكان حسب فئات العمر والجنس في حي ${neighborhood}]`;
        // console.log("Executing Query 2:", query2);
        const result2 = await pool.request().query(query2);
        // console.log("Result 2 fetched:", result2.recordset);

        const query3 = `SELECT * FROM [السكان حسب فئات العمر والجنسية في حي ${neighborhood}]`;
        // console.log("Executing Query 3:", query3);
        const result3 = await pool.request().query(query3);
        // console.log("Result 3 fetched:", result3.recordset);


        const query4 = `SELECT * FROM [متوسط الدخل الشهري للفرد العامل في حي ${neighborhood}]`;
        // console.log("Executing Query 4:", query4);
        const result4 = await pool.request().query(query4);
        // console.log("Result 4 fetched:", result4.recordset);

        const query5 = `SELECT * FROM [نقاط الاهتمام في حي ${neighborhood}]`;
        // console.log("Executing Query 5:", query5);
        const result5 = await pool.request().query(query5);
        // console.log("Result 5 fetched:", result5.recordset);

        // Respond with Arabic keys
        res.json({
          "المعلومات الديموغرافية": result1.recordset,
          "بيانات السكان حسب فئات العمر والجنس": result2.recordset,
          "بيانات السكان حسب فئات العمر والجنسية": result3.recordset,
          "متوسط الدخل الشهري": result4.recordset,
          "نقاط الاهتمام": result5.recordset,
        });
      } catch (err) {
        console.error("Error executing query:", err);

        // Debugging: Log detailed error information
        // console.log("Error stack trace:", err.stack);
        res
          .status(500)
          .send({ error: "Database query error", details: err.message });
      }
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    console.log("Error stack trace:", err.stack); // Debugging database connection errors
  });

const PORT = 4000;
app.listen(PORT);
