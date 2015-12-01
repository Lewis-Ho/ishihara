var mongoose = require('mongoose');

/* prompt> */ var GameSchema = new mongoose.Schema({
  round : Number,
  score : Number,
  age: Number,
  is_color_blind: Boolean,
  play_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);