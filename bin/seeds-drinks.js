const mongoose = require("mongoose");
const Drink = require("../models/Drink.model");

mongoose
    .connect("mongodb://127.0.0.1:27017/pizza-restaurant")
    .then((x) => {
        console.log(`Connected! Database name: "${x.connections[0].name}"`);

        return Drink.deleteMany({});
    })
    .then((response) => {
        console.log(response);

        const newDrinksArr = [
            {
                title: "Coke",
                price: 2.5,
                imageFile: "coke.png",
            },
            {
                title: "Water",
                price: 1.5,
                imageFile: "water.png",
            },
            {
                title: "Beer",
                price: 4,
                imageFile: "beer.png",
            },
            {
                title: "Wine",
                price: 6,
                imageFile: "wine.png",
            },
        ];

        return Drink.insertMany(newDrinksArr);
    })
    .then((drinkArrFromDB) => {
        console.log("Number of drinks created: ", drinkArrFromDB.length);

        mongoose.connection.close();
    })
    .catch((err) => console.error("Error... ", err));
