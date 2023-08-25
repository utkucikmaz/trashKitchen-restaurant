const express = require("express");
const app = express();
const hbs = require("hbs");
const { mongoose, Schema } = require("mongoose");
const Pizza = require("./models/Pizza.model");
const Drink = require("./models/Drink.model");

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials
app.use(express.static("public"));

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

// Connect to DB
mongoose
    .connect("mongodb://127.0.0.1:27017/", {
        dbName: "pizza-restaurant",
    })
    .then((x) => {
        console.log(`Connected! Database name: "${x.connections[0].name}"`);
    })
    .catch((err) => console.error("Error... ", err));

mongoose
    .connect("mongodb://127.0.0.1:27017/", {
        dbName: "pizza-restaurant",
    })
    .then((x) => {
        console.log(`Connected! Database name: "${x.connections[0].name}"`);
    })
    .catch((err) => console.error("Error... ", err));

// Home Page
app.get("/", (req, res, next) => {
    res.render("homepage");
});

// Contact Page
app.get("/contact", (req, res, next) => {
    res.render("contact");
});

app.get("/pizza-list", (req, res, next) => {
    Pizza.find()
        .then((resultList) => {
            console.log(resultList);
            res.render("pizzaList", resultList);
        })
        .catch((err) => {
            console.error("Error... ", err);
        });
});

app.get("/drink-list", (req, res, next) => {
    Drink.find()
        .then((resultList) => {
            console.log(resultList);
            res.render("drinkList", resultList);
        })
        .catch((err) => {
            console.error("Error... ", err);
        });
});

//Pizzas
//Generic Pizza URL and data
app.get(`/pizzas/:pizzaName`, (req, res, next) => {
    Pizza.findOne({ title: `${req.params.pizzaName}` })
        .then((dataPizza) => {
            res.render("product", dataPizza);
        })
        .catch((err) => {
            console.error("Error... ", err);
        });
});

app.listen(3000, () => console.log("My first app listening on port 3000! "));
