var express = require('express');
var router = express.Router();
var Pet = require('../models/pet');
var middleware = require('../middleware');
var request = require('request');

//INDEX - show all pets
router.get('/', function(req, res) {
	// Get all pets from DB
	Pet.find({}, function(err, allPets) {
		if (err) {
			console.log(err);
		} else {
			request(
				'https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM',
				function(error, response, body) {
					if (!error && response.statusCode == 200) {
						console.log(body); // Show the HTML for the Modulus homepage.
						res.render('pets/index', { pets: allPets });
					}
				},
			);
		}
	});
});

//CREATE - add new pet to DB
router.post('/', middleware.isLoggedIn, function(req, res) {
	// get data from form and add to pets array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username,
	};
	var newPet = { name: name, image: image, description: desc, author: author };
	// Create a new pet and save to DB
	Pet.create(newPet, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			//redirect back to pets page
			console.log(newlyCreated);
			res.redirect('/pets');
		}
	});
});

//NEW - show form to create new pet
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('pets/new');
});

// SHOW - shows more info about one pet
router.get('/:id', function(req, res) {
	//find the pet with provided ID
	Pet.findById(req.params.id).populate('comments').exec(function(err, foundPet) {
		if (err) {
			console.log(err);
		} else {
			console.log(foundPet);
			//render show template with that pet
			res.render('pets/show', { pet: foundPet });
		}
	});
});

router.get('/:id/edit', middleware.checkUserPet, function(req, res) {
	console.log('IN EDIT!');
	//find the pet with provided ID
	Pet.findById(req.params.id, function(err, foundPet) {
		if (err) {
			console.log(err);
		} else {
			//render show template with that pet
			res.render('pets/edit', { pet: foundPet });
		}
	});
});

router.put('/:id', function(req, res) {
	var newData = { name: req.body.name, image: req.body.image, description: req.body.desc };
	Pet.findByIdAndUpdate(req.params.id, { $set: newData }, function(err, pet) {
		if (err) {
			req.flash('error', err.message);
			res.redirect('back');
		} else {
			req.flash('success', 'Successfully Updated!');
			res.redirect('/pets/' + pet._id);
		}
	});
});

//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You must be signed in to do that!");
//     res.redirect("/login");
// }

module.exports = router;
