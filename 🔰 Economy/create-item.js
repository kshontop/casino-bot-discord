const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const userSchema = require('../../../Models/user');
const guildSchema = require('../../../Models/guild');
const {prefix} = require('../../../config')
module.exports = {
    name: "create-item",
    aliases: [],
    cooldown: 2000,
    run: async (client, message, args) => {
    
        let guild = await guildSchema.findOne({ guildID: message.guild.id });
        if(!guild) {
            guild = new guildSchema({ guildID: message.guild.id });
            await guild.save();
        } 
        guild = await guildSchema.findOne({ guildID: message.guild.id });

        const embed = new EmbedBuilder()

        
        const nom = args[0];
        if (nom.length > 15) {
            console.log("Le nom dépasse 15 caractères !");
            return message.reply({embeds: [embed.setDescription(`Le nom dépasse 15 caractères !.\n\n❗ Exemple: ${prefix}create-item chicken 100`).setColor('Red')]});
        }
        if (guild.shop.length >= 21) {
            return message.reply({embeds: [embed.setDescription(`La limite de 21 items dans le shop a été atteinte.`).setColor('Red')]});
        }
        const prix = parseInt(args[1]);
        if (!nom || !prix || prix % 1 != 0 || prix <= 0) {
            return message.reply({embeds: [embed.setDescription(`Merci de saisir un nom d'item et un prix valide.\n\n❗ Exemple: ${prefix}create-item chicken 100`).setColor('Red')]});
        }
        try {
            const nomCapitalized = nom.charAt(0).toUpperCase() + nom.slice(1).toLowerCase();
            // Vérifier si l'item existe déjà
            const existingItem = guild.shop.find(item => item.nom === nomCapitalized);
            if (existingItem) {
                return message.reply({embeds: [embed.setDescription(`Cet item existe déjà dans le shop.`).setColor('Red')]});
            }

            guild.shop.push({ nom: nomCapitalized, prix });
            await guild.save();

            return message.reply({embeds: [embed.setTitle(`✅ Item créé : ${nomCapitalized}`).addFields({ name: `Prix`, value: `${prix}€`}).setColor('Green')]});
        } catch (error) {
            console.error(error);
        }
    }
 };
