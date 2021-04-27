const mongoose = require('mongoose')
const Schema = mongoose.Schema


const recipesSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    description: String,
    steps: [{
        time: Number,
        text: String,
        cookware: [String]
    }],
    ingredients: [{
        weight:{
            measurement: Number,
            system: String
        },
        food: String,
        ingredientsImage: String
    }],
    images: [String]
}, {
    timestamps: true
})

const Recipes = mongoose.model("Recipes", recipesSchema)

module.exports = Recipes