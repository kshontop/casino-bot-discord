const { EmbedBuilder } = require("discord.js");
const guildSchema = require('../../../Models/guild');
const userSchema = require('../../../Models/user');
const {prefix} = require('../../../config')

module.exports = {
    name: "cock-fight",
    aliases: ["cf"],
    cooldown: 2000,
    run: async (client, message, args) => {
        let guild = await guildSchema.findOne({ guildID: message.guild.id });
        if (!guild) {
            guild = new guildSchema({ guildID: message.guild.id });
            await guild.save();
        }
        guild = await guildSchema.findOne({ guildID: message.guild.id });
        const embed = new EmbedBuilder()

        if(!args[0]) {
            embed.setColor('Red');
            embed.setDescription(`❌ Argument manquant.\n\nUtilisation:\n\`cock-fight <somme>\``);
            return message.reply({embeds: [embed]});
        }
        if (isNaN(args[0]) || args[0] <= 0 || args[0] < 100) {
            embed.setColor('Red');
            embed.setDescription(`❌ La mise minimum est de \`100\`€.`);
            return message.reply({embeds: [embed]});
          }

        const chicken = guild.shop.findIndex(item => item.nom == "Chicken");
        if (chicken === -1) {
            embed.setColor('Red');
            embed.setDescription(`❌ Il n'y a pas de poulet dans le magasin.\n\nVeuillez utiliser la commande \`create-item Chicken <prix>\``);
            return message.reply({embeds: [embed]});
        }


        


        
    }
};