const express = require("express");
const app = express();
const hbs = require("hbs");
const { mongoose, Schema } = require("mongoose");
const Pizza = require("./models/Pizza.model");
const Drink = require("./models/Drink.model");
const bodyParser = require("body-parser");

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to DB
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

app.get("/pizzas", (req, res, next) => {
    let maxPrice = req.query.maxPrice;
    maxPrice = Number(maxPrice); //convert to a number

    let filter = {};
    if (maxPrice) {
        filter = { price: { $lte: maxPrice } };
    }

    Pizza.find(filter)
        .then((pizzasArr) => {
            res.render("product-list", pizzasArr);
        })
        .catch((e) => console.log("Error getting list of pizzas from DB", e));
});

app.get("/drinks", (req, res, next) => {
    Drink.find()
        .then((resultList) => {
            console.log(resultList);
            res.render("product-list", resultList);
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

app.get(`/drinks/:drinkName`, (req, res, next) => {
    Drink.findOne({ title: `${req.params.drinkName}` })
        .then((dataDrink) => {
            res.render("product", dataDrink);
        })
        .catch((err) => {
            console.error("Error... ", err);
        });
});

app.post("/login", (req, res, next) => {
    console.log(req.body);
    if (req.body.pwd === "ilovepizza") {
        res.send("welcome");
    } else {
        res.send("sorry, not allowed");
    }
});

app.listen(3000, () => console.log("My first app listening on port 3000! "));
