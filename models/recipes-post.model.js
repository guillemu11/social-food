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
        time: String,
        text: String,
        cookware: String
    }],
    ingredients: String,
    // [{
    //     weight:{
    //         measurement: Number,
    //         system: String
    //     },
    //     food: String,
    //     ingredientsImage: String
    // }],
    image: [String]
}, {
    timestamps: true
})

const Recipes = mongoose.model("Recipes", recipesSchema)

module.exports = Recipes