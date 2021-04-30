const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantPostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ubication: String,
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    name: String,
    description: String,
    cuisine: String, 
    image: String
}, {
    timestamps: true
})

restaurantPostSchema.index({ location: '2dsphere' })        

const Restaurant = mongoose.model("Restaurant", restaurantPostSchema)

module.exports = Restaurant




