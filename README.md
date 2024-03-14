github directory - https://github.com/wiut00016474/Web_technology_CW

This web application is for sharing food recipes online. With the help of this app, people can see and share recipes. The developer can delete and update the recipes with the functions included in its code.

Dependencies that should be installed:
connect-flash 
cookie-parser
dotenv
ejs
express
express-ejs-layouts
express-fileupload
express-session
mongodb
mongoose

app.js - brain of the application. All dependencies are included here. Express server is created to do this.

models - are how we structure database. I created 2 main models: 1 for food recipe, 1 for category of the recipe. They include property names, which was useful to create instances

routes/recipeRoutes - contains all the router of the app

ejs files are used because it allows us to generate dynamic HTML pages by embedding JavaScript code within our HTML templates.

As a database, mongodb is used. 

/views/layouts/main.ejs - is global layout. The header (including navbar) and footer were built there.

views/index.ejs - home page of the app.
