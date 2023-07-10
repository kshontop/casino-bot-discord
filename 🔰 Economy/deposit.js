const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const userSchema = require('../../../Models/user');
module.exports = {
    name: "deposit",
    aliases: ["dep"],
    cooldown: 2000,
    run: async (client, message, args) => {
      
        var data = await userSchema.findOne({guildID: message.guild.id ,userID: message.author.id});
        let montant = args[0];

        if(["todo", "all-in", "all"].includes(args[0])) {
            montant = data.cash
            if(montant % 1 != 0 || montant <= 0) return message.reply("❌ **Vous n'avez pas indiqué un montant valide à deposer!**");
            if (parseInt(montant) > parseInt(data.cash)) return message.reply("❌ **Vous n'avez pas autant d'argent à deposer!**");
        } else {
            if(montant % 1 != 0 || montant <= 0) return message.reply("❌ **Vous n'avez pas indiqué un montant valide à deposer!**");
            if (parseInt(montant) > parseInt(data.cash)) return message.reply("❌ **Vous n'avez pas autant d'argent à deposer!**");
        }
        await userSchema.findOneAndUpdate(
            { guildID: message.guild.id, userID: message.author.id },
            {
                $inc: { cash: -montant, bank: montant },
            }
        );

        data = await userSchema.findOne({guildID: message.guild.id ,userID: message.author.id});
        
        return message.reply({embeds: [new EmbedBuilder().setColor('Green').setTitle(`✅ Argent déposé`).setDescription(`\`${montant.toLocaleString('en-US')}\`€ ont été déposés dans votre banque !\n\n🏦 **Banque actuelle :** \`${data.bank.toLocaleString('en-US')}\`€`)]})
    }
 };
