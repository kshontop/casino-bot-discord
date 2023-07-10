const { EmbedBuilder } = require("discord.js");
const guildSchema = require('../../../Models/guild');

module.exports = {
    name: "shop",
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

        let shop = guild.shop;
        if (shop.length === 0 || !shop) {
            return message.reply({embeds: [embed.setDescription("Aucun item disponible dans le shop.")]});
        }

        shop.sort((a, b) => b.prix - a.prix);

        embed.setColor('Orange');
        for (let i = 0; i < shop.length; i++) {
            embed.addFields({ name: shop[i].nom, value: `Prix : ${shop[i].prix}€`, inline: true });
        }

        return message.reply({embeds: [embed.setDescription("Liste des items disponibles dans le shop (triée par prix décroissant).")]});
    }
};