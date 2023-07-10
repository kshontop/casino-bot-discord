const { ActivityType, Events } = require("discord.js")
const mongoose = require('mongoose');
const { mongodb } = require('./../config')
const { addCooldownField } = require('../misc/functions');
module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
   
		
		await mongoose.connect(mongodb, {
			keepAlive: true,
		});

		if(mongoose.connect) {
			console.log('MongoDB connection succesful.');
		}
		console.log(`${client.user.username} is now online.`);
		await addCooldownField();
}};
