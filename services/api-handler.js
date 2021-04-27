const axios = require('axios')

class SpoonacularApp { 
    constructor() {

        this.apiKey= '54362f27bf61476e95d0f5988211fbfd'
        this.api = axios.create({
            baseURL:`https://api.spoonacular.com/recipes`,
        })
    }
    randomRecipes = () => this.api.get(`/random?apiKey=${this.apiKey}`)
    searchRecipes = (cuisine, diet) => {
        this.api.get(`/complexSearch?apiKey=${this.apiKey}`)
    }
}
new SpoonacularApp()
module.exports = SpoonacularApp