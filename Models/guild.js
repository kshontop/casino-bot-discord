const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  guildID: String,
  shop: { type: Array }
});

const model = mongoose.model("Guild", guildSchema);

module.exports = model;