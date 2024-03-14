// select add ingredient button
let addIngredientButton = document.getElementById('addIngredientsButton');

// get ingredient list
let ingredientList = document.querySelector('.ingredientList');
// first element
let ingredientDiv =document.querySelectorAll('.ingredientDiv')[0];


addIngredientButton.addEventListener('click', function(){
    // clone the ingredient
    let newIngredients = ingredientDiv.cloneNode(true);
    // grab the input
    let input = newIngredients.getElementsByTagName('input')[0];
    // reset value
    input.value = '';
    // append new ingredient to ingredient list
    ingredientList.appendChild(newIngredients);

})