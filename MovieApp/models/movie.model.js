const mongoose = require("mongoose");

const movie = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isRecommended: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  watches: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  watchRate: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movie);
