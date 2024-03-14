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
        res.status(500).send({message: error.message || "There is an error"});

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
        res.status(500).send({message: error.message || "There is an error"});

    }
}

// GET /recipes/:id 
// show recipes with more details
exports.seeRecipe = async(req, res) => {
    try {
        // grab id of each recipe
        let recipeId = req.params.id;

        // query on database
        const recipe = await Recipe.findById(recipeId);

        res.render('recipe', {title: 'Cooking Blog - Recipe', recipe});


    } catch (error) {
        res.status(500).send({message: error.message || "There is an error"});

    }
}



// GET /categories/:id 
// show categories by Id
exports.seeCategoriesById = async(req, res) => {
    try {
        // grab id of each category
        let categoryId = req.params.id;

        // query on database
        const categoryById = await Recipe.find({'category' : categoryId});

        res.render('categories', {title: 'Cooking Blog - Categories', categoryById});


    } catch (error) {
        res.status(500).send({message: error.message || "There is an error"});

    }
}



// GET /explore-latest 
// show latest recipes
exports.exploreLatest = async(req, res) => {
    try {
        const limitNum = 20;
        // get latest recipes
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNum);
        
        res.render('exploreLatest', {title: 'Cooking Blog - Categories', recipe});


    } catch (error) {
        res.status(500).send({message: error.message || "There is an error"});

    }
}

// GET /submit-recipe
// allow submitting recipes
exports.submitRecipe = async(req, res) => {
    try {
        res.render('submitRecipe', {title: 'Cooking Blog - Submit your recipe'});


    } catch (error) {
        res.status(500).send({message: error.message || "There is an error"});
    }
}




// this function currently works if it is hardcoded
// POST /submit-recipe
// allow submitting recipes
exports.submitRecipePost = async(req, res) => {
    try {

        // to get uploaded image
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No files were uploaded')
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now()+imageUploadFile.name;
            uploadPath = require('path').resolve('./') + '/public/uploads' + newImageName;

            imageUploadFile.mv(uploadPath, function(err) {
               if (err) return res.satus(500).send(err); 
            })
        }



    
        
        // submitting data to the database
        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName

        });
        // save the data
        await newRecipe.save();


        
        res.redirect('/share-recipe');


    } catch (error) {
        res.status(500).send({message: error.message || "There is an error"});
    }
}


// hardcoded version
exports.submitRecipePost = async(req,res) =>{
    try{
        // submitting data to the database
        const newRecipe = new Recipe({
            name: "Adfg",
            description: "gsdfvjhwf",
            email: "hbfebf",
            ingredients: "jrgnkjer",
            category: "Uzbek",
            image: "gfeg.jpg"

        });
        // save the data
        await newRecipe.save();

    } catch{
        res.status(500).send({message: error.message || "There is an error"});


    }
}
//submitRecipePost();





// POST /search
// search recipes

exports.searchRecipe = async(req, res) => {
    try {
        // get search phrase
        let searchTerm = req.body.searchTerm

        // query on database
        let recipe = await Recipe.find({ $text: {$search: searchTerm, $diacriticSensitive: true} });
         
        // render the recipe data
        res.render('search', {title: 'Cooking Blog - Search', recipe});        
    } catch (error) {
        res.status(500).send({message: error.message || "There is an error"});
    }

}


// update recipe
async function updateRecipe(){
    try {
        const res = await Recipe.updateOne({name: "Osh"}, {name: 'New Recipe Updated'});
        res.n; // number of documents matched
        res.nModified;
    } catch (error){
        console.log(error)
    }
}
// updateRecipe();




// delete recipe
async function deleteRecipe(){
    try {
       await Recipe.deleteOne({name: 'New Recipe Updated'});
    } catch (error){
        console.log(error)
    }
}
// deleteRecipe();



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