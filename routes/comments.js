var express = require('express');
var router = express.Router({ mergeParams: true });
var Pet = require('../models/pet');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//Comments New
router.get('/new', middleware.isLoggedIn, function(req, res) {
	// find pet by id
	console.log(req.params.id);
	Pet.findById(req.params.id, function(err, pet) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { pet: pet });
		}
	});
});

//Comments Create
router.post('/', middleware.isLoggedIn, function(req, res) {
	//lookup pet using ID
	Pet.findById(req.params.id, function(err, pet) {
		if (err) {
			console.log(err);
			res.redirect('/pets');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					pet.comments.push(comment);
					pet.save();
					console.log(comment);
					req.flash('success', 'Created a comment!');
					res.redirect('/pets/' + pet._id);
				}
			});
		}
	});
});

router.get('/:commentId/edit', middleware.isLoggedIn, function(req, res) {
	// find pet by id
	Comment.findById(req.params.commentId, function(err, comment) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/edit', { pet_id: req.params.id, comment: comment });
		}
	});
});

router.put('/:commentId', function(req, res) {
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment) {
		if (err) {
			res.render('edit');
		} else {
			res.redirect('/pets/' + req.params.id);
		}
	});
});

router.delete('/:commentId', middleware.checkUserComment, function(req, res) {
	Comment.findByIdAndRemove(req.params.commentId, function(err) {
		if (err) {
			console.log('PROBLEM!');
		} else {
			res.redirect('/pets/' + req.params.id);
		}
	});
});

module.exports = router;
