const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemon = require("nodemon");
const app = express();

app.use(cors());
app.use(bodyParser.json());
 
app.get("/", (rqs, res) => {
    res.send("Fut a backend!")
});
 
app.listen(8080, () => {
    console.log("A 8080 porton fut!")
});

const db = mysql.createConnection({
        user: "root",
        host: "localhost",
        port: 3307,
        password: "",
        database: "driveus"
});

app.get("/kolcsonozhetoautok", (req, res) => {
    const sql = "SELECT * FROM `kolcsonozhetoautok`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
});

app.get("/marka", (req,res) => {
    const sql = "SELECT `marka` FROM `kolcsonozhetoautok`;";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
});