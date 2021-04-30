const axios = require('axios')

class SpoonacularApp {
    constructor() {
        this.apiKey = '60838d3f37fd4881aa4315a116f5130e'
        this.api = axios.create({
            baseURL: `https://api.spoonacular.com/recipes`,
        })
    }
    randomRecipes = () => this.api.get(`/random?apiKey=${this.apiKey}`)
    searchRecipesByCuisine = (cuisine) => this.api.get(`/complexSearch?apiKey=${this.apiKey}&cuisine=${cuisine}&number=30`)
    searchRecipesByType = (type) => this.api.get(`/complexSearch?apiKey=${this.apiKey}&type=${type}&number=30`)
    recipeInformation = (id) => this.api.get(`/${id}/analyzedInstructions?apiKey=${this.apiKey}`)
}
new SpoonacularApp()
module.exports = SpoonacularApp