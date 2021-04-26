const mongoose = require('mongoose')
const Schema = mongoose.Schema


const restaurantPostSchema = new Schema ({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    description: String,
    image: String
}, {
    timestamps: true
})

const Restaurant = mongoose.model("Restaurant", restaurantPostSchema)

module.exports = Restaurant




