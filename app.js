const express = require("express");
const app = express();
app.use(express.static("public"));

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine

// app.get(path, code)

// Home Page
app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/views/homepage.html");
});

// Contact Page
app.get("/contact", (req, res, next) => {
    res.sendFile(__dirname + "/views/contact.html");
});

//Pizzas
//Margarita
app.get("/pizzas/margarita", (req, res, next) => {
    //res.render(path, data)

    const data = {
        title: "Pizza Margarita",
        price: 12,
    };
    res.render("product", data);
});
//vegıe
app.get("/pizzas/veggie", (req, res, next) => {
    res.send("Veggie Pizza");
});
//seafood
app.get("/pizzas/seafood", (req, res, next) => {
    res.send("Seafood Pizza");
});

app.listen(3000, () => console.log("My first app listening on port 3000! "));
