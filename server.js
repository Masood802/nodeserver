const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const port = process.env.port || 5000;
app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`server is running at:${port}`);
});
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "M@sood1435",
  database: "recipies",
});
connection.connect((error) => {
  if (error) {
    console.error("Error connecting database", error);
  } else {
    // 
    console.log("connected")
  }
});
app.use((req, res, err, next) => {
  res.status(err.status || 500).json({ error: err.message });
});
//get request to show all categories of meals...
app.get("/all", async (req, res) => {
  try {
         connection.query(`select * from categories`, (err, result, fields) => {
           if (err) {
             console.log(err);
           }
           console.log(result);
           res.send(result);
         });
    // axios
    //   .get("http://themealdb.com/api/json/v1/1/categories.php")
    //   .then((resp) => {
    //     console.log(resp.data.categories);
    //     res.send(resp.data.categories);
    //   });
  } catch (error) {
    next(error);
  }
});
app.get("/", (req, res) => {
  res.send("Welcome to Meals Database");
});
//post request to list of meals in specific category..
app.post("/categorywise-list", async (req, res) => {
  const category = req.body.category;
  try {
    axios
      .get(`http://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((resp) => {
        res.send(resp.data);
      });
  } catch (error) {
    next(error);
  }
});
//post request to show details of any meal for given id..
app.post("/details", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    axios
      .get(`http://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((resp) => {
        if (resp.data.meals) {
          res.send(resp.data.meals);
        } else {
          res.send(`No recipie found for the id ${id} `);
        }
      });
  } catch (error) {
    next(error);
  }
});
