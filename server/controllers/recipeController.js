// require database
require('../models/database');

// require categories model
const Category = require('../models/Recipe_category');
const Recipe = require('../models/Recipe');


// get page
// this is homepage
exports.homepage = async(req, res) => {
    try {
        // set constant number for my categories - 4
        const limitNum = 4;
        const categories = await Category.find({}).limit(limitNum);
        // get the latest recipes only
        const latestRecipe = await Recipe.find({}).sort({_id: -1}).limit(limitNum);
        

        // recipes of all categories
        const italian = await Recipe.find({'category':'Italian'}).limit(limitNum);
        const uzbek = await Recipe.find({'category':'Uzbek'}).limit(limitNum);
        const chinese = await Recipe.find({'category':'Chinese'}).limit(limitNum);
        const mexican = await Recipe.find({'category':'Mexican'}).limit(limitNum);

        // pass all of these as a whole
        const food = {latestRecipe, italian, uzbek, chinese, mexican};


        res.render('index', {title: 'Cooking Blog - Home', categories, food});


    } catch (error) {
        res.satus(500).send({message: error.message || "There is an error"});

    }
}


// GET /categories 
// show categories
exports.seeCategories = async(req, res) => {
    try {
        // increase the limit
        const limitNum = 20;
        const categories = await Category.find({}).limit(limitNum);



        res.render('categories', {title: 'Cooking Blog - Categories', categories});


    } catch (error) {
        res.satus(500).send({message: error.message || "There is an error"});

    }
}






// inserting dummy data
// async function insertRecipeData(){
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "Stir-Fried Tofu and Vegetables",
//                 "description": "A delicious and healthy stir-fry dish with tofu and a variety of fresh vegetables.",
//                 "email": "example@example.com",
//                 "ingredients": ["200g tofu", "1 red bell pepper", "1 carrot", "100g broccoli florets", "100g snow peas", "2 tablespoons soy sauce", "1 tablespoon sesame oil", "2 cloves garlic", "1 teaspoon grated ginger", "Salt and pepper to taste"],
//                 "category": "Chinese",
//                 "image": "https://example.com/images/stir-fried-tofu-vegetables.jpg"
//               },
//               {
//                 "name": "Mexican Chicken Fajitas",
//                 "description": "A flavorful and sizzling dish featuring marinated chicken, colorful bell peppers, and onions, served with warm tortillas.",
//                 "email": "example@example.com",
//                 "ingredients": ["500g chicken breast", "1 red bell pepper", "1 green bell pepper", "1 yellow bell pepper", "1 onion", "2 tablespoons olive oil", "2 tablespoons fajita seasoning", "1 lime", "Fresh cilantro for garnish", "8 flour tortillas"],
//                 "category": "Mexican",
//                 "image": "https://example.com/images/mexican-chicken-fajitas.jpg"
//               },
//               {"name": "Spaghetti Carbonara",
//   "description": "A classic Italian pasta dish made with spaghetti, crispy bacon, eggs, Parmesan cheese, and black pepper.",
//   "email": "example@example.com",
//   "ingredients": ["200g spaghetti", "150g bacon", "2 cloves garlic", "2 large eggs", "1/2 cup grated Parmesan cheese", "Freshly ground black pepper", "Salt to taste", "Chopped parsley for garnish"],
//   "category": "Italian",
//   "image": "https://example.com/images/spaghetti-carbonara.jpg"}
//             ]);
//     } catch (error) {
//         console.log('err' + error)
//     }
// }

// insertRecipeData();