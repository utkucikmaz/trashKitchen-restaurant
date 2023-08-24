const { mongoose, Schema } = require("mongoose");
const Pizza = require("./models/Pizza.model");

mongoose
    .connect("mongodb://127.0.0.1:27017/pizza-restaurant")
    .then((response) => {
        console.log(`connected! database name ${response.connections[0].name}`);

        //create a new document(a new pizza) -> always return promise, then we put .then :)
        return Pizza.create({
            title: "margarita",
            price: 12,
            ingredients: ["basilikum", "salt"],
        });
    })
    .then((pizzaFromDB) => {
        console.log(`your pizza is created`, pizzaFromDB);

        const newPizzasArray = [
            {
                title: "veggie",
                price: 10,
                isVeggie: true,
                ingredients: ["garlic"],
            },
            {
                title: "seafood",
                price: 15,
                ingredients: ["sugar", "onion"],
            },
        ];

        return Pizza.insertMany(newPizzasArray);
    })
    .then((pizzasCreated) => {
        console.log(`${pizzasCreated.length} pizzas are created`);

        //return Pizza.find({ isVeggie: true }); //to filter something
        return Pizza.find({ isVeggie: true }); //to filter something
    })
    .then((pizzaFinder) => {
        console.log(`the number of pizzas ${pizzaFinder.length}`);

        //Pizza.findOneAndUpdate(filter, update)
        return Pizza.findOneAndUpdate(
            { title: "margarita" },
            { price: 12.5 },
            { returnDocument: "after" } //it brings correct prise directly otherwise it updates in second console.log
        );
    })
    .then((pizzaFirstUpdated) => {
        console.log(`the updated pizzas ${pizzaFirstUpdated}`);

        Pizza.deleteMany({ title: "seafood" }); // if you don't pass anything it deletes all
    })
    .catch((err) => console.error("Error: ", err));
