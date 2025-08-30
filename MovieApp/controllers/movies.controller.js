const Movie = require('../models/movie.model');

// get all movies
exports.getAllMovies = async(req, res)=>{
    try{
        const movies = await Movie.find();
        res.json(movies);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
// get recommended movie
exports.getRecommendedMovie = async(req, res)=>{
    try{
        const movies = await Movie.find({isRecommended: true});
        res.json(movies);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
// get movie by id
exports.getMovieById = async(req, res)=>{
    try{
        const movie = await Movie.findOne({ id: req.params.id });;
        if (!movie) {
            res.status(404).json({message: "Movie Not Found"});
        }
        res.json(movie);
    }catch (err) {
    res.status(500).json({ message: err.message });
    }
}