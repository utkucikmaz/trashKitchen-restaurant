const express = require("express");
const app = express();
const hbs = require("hbs");
const { mongoose, Schema } = require("mongoose");
const Pizza = require("./models/Pizza.model");

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials
app.use(express.static("public"));

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

// Connect to DB
mongoose
    .connect("mongodb://127.0.0.1:27017/pizza-restaurant")
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

//Pizzas
//Margarita
app.get("/pizzas/margarita", (req, res, next) => {
    Pizza.findOne({ title: "margarita" })
        .then((dataMargarita) => {
            res.render("product", dataMargarita);
            console.log(dataMargarita);
        })
        .catch((err) => {
            console.error("Error... ", err);
        });
});
//veggie
app.get("/pizzas/veggie", (req, res, next) => {
    Pizza.findOne({ title: "veggie" })
        .then((dataVeggie) => {
            res.render("product", dataVeggie);
            console.log(dataVeggie);
        })
        .catch((err) => {
            console.error("Error... ", err);
        });
});
//seafood
app.get("/pizzas/seafood", (req, res, next) => {
    Pizza.findOne({ title: "seafood" })
        .then((dataSeafood) => {
            res.render("product", dataSeafood);
            console.log(dataSeafood);
        })
        .catch((err) => {
            console.error("Error... ", err);
        });
});
//hawai
app.get("/pizzas/hawaiian", (req, res, next) => {
    Pizza.findOne({ title: "hawaiian" })
        .then((dataHawaiian) => {
            res.render("product", dataHawaiian);
            console.log(dataHawaiian);
        })
        .catch((err) => {
            console.error("Error... ", err);
        });
});

app.listen(3000, () => console.log("My first app listening on port 3000! "));
