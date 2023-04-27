const { Schema, model } = require('mongoose');

const scoreSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  score: {
    type: Number,
    default: 0
  },

  
});
const Score = model('score', scoreSchema)

module.exports = Score