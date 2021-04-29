const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipesSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        require: [true, 'Es obligatorio ponerle un nombre a la receta']
    },
    description: String,
    steps: [{
        time: String,
        text: String,
        cookware: String
    }],
    ingredients: {
        type: String,
    },
    image: [String]
}, {
    timestamps: true
})

const Recipes = mongoose.model("Recipes", recipesSchema)

module.exports = Recipes