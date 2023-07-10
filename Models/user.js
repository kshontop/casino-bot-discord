const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  guildID: String,
  userID: { type: String, require: true},

  cash: { type: Number, default: 0},
  bank: { type: Number, default: 500},

  cooldowns: {
    slut: { type: Date },
    work: { type: Date },
    rob: { type: Date},
  },

  inv: { type: Array},
});

const model = mongoose.model("ConfigUser", userSchema);

module.exports = model;