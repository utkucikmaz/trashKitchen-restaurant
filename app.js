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
    const dataVeggie = {
        title: "Veggie Pizza",
        price: 15,
        recommendedDrink: "Power smoothie",
        imageFile: "pizza-veggie.jpg",
        ingredients: [
            {
                ingredientName: "cherry tomatoes",
                calories: 80,
            },
            {
                ingredientName: "basilicum",
                calories: 30,
            },
            {
                ingredientName: "olives",
                calories: 300,
            },
        ],
    };
    res.render("product", dataVeggie);
});
//seafood
app.get("/pizzas/seafood", (req, res, next) => {
    const dataSeafood = {
        title: "Seafood Pizza",
        price: 20,
        recommendedDrink: "White wine",
        imageFile: "pizza-seafood.jpg",
        ingredients: ["tomato sauce", "garlic", "prawn"],
        ingredients: [
            {
                ingredientName: "tomato sauce",
                calories: 200,
            },
            {
                ingredientName: "garlic",
                calories: 20,
            },
            {
                ingredientName: "prawn",
                calories: 350,
            },
        ],
    };
    res.render("product", dataSeafood);
});

app.listen(3000, () => console.log("My first app listening on port 3000! "));
