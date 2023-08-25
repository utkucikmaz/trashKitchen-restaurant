const { mongoose, Schema } = require("mongoose");

const drinkSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    imageFile: {
        type: String,
    },
    size: {
        type: String,
        enum: ["Small", "Medium", "Large"],
    },
    dbcoll: {
        type: String,
        default: "drinks",
    },
});

const Drink = mongoose.model("Drink", drinkSchema);

module.exports = Drink;
