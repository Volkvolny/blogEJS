//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let posts = []; //init our array of new posts. let is safer than var for global variables

app.set('view engine', 'ejs'); //tells our app generated w/ express that ejs is its view engine
//View engine is how we render the view of the browser by combining HTMl and programming languages
//Our view engine will be default look for a folder called views for its pages

app.use(bodyParser.urlencoded({extended: true})); //This is used so that we can parse the incoming post body text
//urlencoded parses POST form data from an HTML file
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home", {homeContent: homeStartingContent, newPosts: posts});
}) //end app.get for home route

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
}) //end app.get for about route

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
}) //end app.get for contact route

app.get("/compose", function(req, res){
  res.render("compose");
}) //end app.get for compose route

app.get("/posts/:postName", function(req, res)
{
  posts.forEach(function(post){
    if (_.lowerCase(post.postTitle) === _.lowerCase(req.params.postName))
    {
      res.render("post", {postTitle: post.postTitle, postText: post.postText});
    }
  }) // end forEach

}) //end app.get for an individual post

app.post("/", function(req, res){
  let postTitle = req.body.newPostTitle;
  let postText = req.body.newPostText;
  const post = {postTitle, postText};

  posts.push(post); //add our new post

  res.redirect("/"); //redirect to home

}) //end app.post for home route





app.listen(3000, function() {
  console.log("Listening in on port 3000, beep boop");
});
