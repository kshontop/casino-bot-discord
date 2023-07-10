const { EmbedBuilder } = require("discord.js");
const guildSchema = require('../../../Models/guild');
const { prefix } = require('../../../config');

module.exports = {
    name: "delete-item",
    aliases: [],
    cooldown: 2000,
    run: async (client, message, args) => {
        let guild = await guildSchema.findOne({ guildID: message.guild.id });
        if (!guild) {
            guild = new guildSchema({ guildID: message.guild.id });
            await guild.save();
        }
        guild = await guildSchema.findOne({ guildID: message.guild.id });

        const embed = new EmbedBuilder();

        const nom = args[0];
        if (!nom) {
            return message.reply({embeds: [embed.setDescription(`Merci de saisir le nom de l'item à supprimer.\n\n❗ Exemple: ${prefix}delete-item chicken`).setColor('Red')]});
        }

        const nomCapitalized = nom.charAt(0).toUpperCase() + nom.slice(1).toLowerCase();
        const existingItemIndex = guild.shop.findIndex(item => item.nom === nomCapitalized);
        if (existingItemIndex === -1) {
            return message.reply({embeds: [embed.setDescription(`Cet item n'existe pas dans le shop.`).setColor('Red')]});
        }

        guild.shop.splice(existingItemIndex, 1);
        await guild.save();

        return message.reply({embeds: [embed.setTitle(`✅ Item supprimé : ${nomCapitalized}`).setColor('Green')]});
    }
};
