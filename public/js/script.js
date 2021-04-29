document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

const fillEditForm = recipesInfo => {
  const input = document.querySelectorAll('#recipesForm input')
  const textArea = document.querySelectorAll('#recipesForm textarea')
  input[0].value = recipesInfo.name
  input[1].value = recipesInfo.time[0]
  input[2].value = recipesInfo.time[1]
  input[3].value = recipesInfo.time[2]
  input[4].value = recipesInfo.time[3]

  textArea[0].value = recipesInfo.description
  textArea[1].value = recipesInfo.text[0]
  textArea[2].value = recipesInfo.text[1]
  textArea[3].value = recipesInfo.text[2]
  textArea[4].value = recipesInfo.text[3]
  textArea[5].value = recipesInfo.cookware[0]
  textArea[6].value = recipesInfo.cookware[1]
  textArea[7].value = recipesInfo.cookware[2]
  textArea[8].value = recipesInfo.cookware[3]
  textArea[9].value = recipesInfo.ingredients

}