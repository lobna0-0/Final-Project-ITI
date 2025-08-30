const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies.controller');

router.get('/movies', movieController.getAllMovies);
router.get('/movies/recommendations', movieController.getRecommendedMovie);
router.get('/movies/:id', movieController.getMovieById);

module.exports = router;