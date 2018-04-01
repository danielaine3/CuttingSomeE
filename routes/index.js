var request = require("request");
var cheerio = require("cheerio");
var express = require("express");

//Initialize Express
var app = express();

//Require all models
var db = require("../models");

//Route to get all Headlines from the db
app.get("/headlines", function(req, res) {
	//Grabe every document in the Headlines collection
	db.Headline.find({})
		.then(function(dbHeadline) {
			//If we were able to successfully find Headlines, send them back to the client
			res.json(dbHeadline);
		})
		.catch(function(err) {
			//If error, send it to client
			res.json(err);
		});
});

//Route for grabbing a Headline by id, populated with any  notes
app.get("headlines/:id", function(req, res) {
	db.Headline.findOne({_id:req.params.id})
		//and populate all of the associated notes
		.populate("note")
		.then(function(dbHeadline) {
			//if successful, send headline back to client
			res.json(dbHeadline);
		})
		.catch(function(err) {
			//If err, send to client
			res.json(err);
		});
});

//Route for saving/updating a Headlines's associated note
app.post("/articles/:id", function(req, res) {
	//Create a new note an pass the rew.body to the entry
	db.Note.create(req.body)
		.then(function(dbNote) {
		// If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. 
		// Update the Article to be associated with the new Note { new: true } tells the query that 
		// we want it to return the updated User -- it returns the original by default
      	// Since our mongoose query returns a promise, we can chain another `.then` which 
      	// receives the result of the query
      		return db.Headline.findOneAndUpdate({ _id: req.params.id}, { note:dbNote._id }, { new:true });
		})
		.then(function(dbHeadline) {
			//Id updated successful, send back to client
			res.json(dbHeadline);
		})
		.catch(function(err) {
			//If error, send to client
			res.json(err);
		});
});

module.exports = app;





