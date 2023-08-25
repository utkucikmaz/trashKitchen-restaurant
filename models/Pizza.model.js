const { mongoose, Schema } = require("mongoose");

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

//create schema
const pizzaSchema = new Schema({
    title: {
        type: String,
        required: true,
        //unique: true  -> returns unique array
    },
    price: {
        type: Number,
        min: 1,
        max: 99,
    },
    isVeggie: {
        type: Boolean,
        default: false,
    },
    dough: {
        type: String,
        enum: ["classic", "extra thin", "with cheese", "with garlic"], //allows only these strings
    },
    ingredients: {
        type: [String], //or Array
    },
    imageFile: {
        type: String,
    },
    size: {
        type: String,
        enum: ["Small", "Medium", "Large"],
    },
    chef: {
        type: String,
    },
});

//create Model
//const Etw = mongoose.model("Name", schema) -> Uppercases!
const Pizza = mongoose.model("Pizza", pizzaSchema);

//we created them up because of the scope (we need to reach Pizza model from everywhere)

module.exports = Pizza; //an object also can be exported  as {Pizza: Pizza}
