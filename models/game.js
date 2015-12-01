var mongoose = require('mongoose');

/* prompt> */ var GameSchema = new mongoose.Schema({
  round : Number,
  score : Number,
  age: Number,
  is_color_blind: Boolean,
  play_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);

//exports.createResult = function(req, res) {
//  var game = new Game(req.params.round, req.params.score, req.params.age, req.params.is_color_blind);
//  game.save();
//  console.log(req.params.round);
//  res.json(req.body);
//};