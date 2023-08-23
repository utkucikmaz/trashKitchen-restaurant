const express = require("express");
const app = express();
const hbs = require("hbs");

hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials
app.use(express.static("public"));

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

// app.get(path, code)

// Home Page
app.get("/", (req, res, next) => {
    res.render("homepage");
});

// Contact Page
app.get("/contact", (req, res, next) => {
    res.render("contact");
});

//Pizzas
//Margarita
app.get("/pizzas/margarita", (req, res, next) => {
    //res.render(path, data)

    const dataMargarita = {
        title: "Margarita Pizza",
        price: 12,
        recommendedDrink: "Beer",
        imageFile: "pizza-margarita.jpg",
        ingredients: [
            {
                ingredientName: "mozzarella",
                calories: 400,
            },
            {
                ingredientName: "tomato sauce",
                calories: 200,
            },
            {
                ingredientName: "basilicum",
                calories: 30,
            },
        ],
    };
    res.render("product", dataMargarita);
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
