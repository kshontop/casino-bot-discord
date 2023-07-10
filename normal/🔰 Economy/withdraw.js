const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const userSchema = require('../../../Models/user');
module.exports = {
    name: "withdraw",
    aliases: ["wd"],
    cooldown: 2000,
    run: async (client, message, args) => {
      
        var data = await userSchema.findOne({guildID: message.guild.id ,userID: message.author.id});
        let montant = args[0];

        if(["todo", "all-in", "all"].includes(args[0])) {
            montant = data.bank
            if(montant % 1 != 0 || montant <= 0) return message.reply("❌ **Vous n'avez pas indiqué un montant valide à retirer!**");
            if (parseInt(montant) > parseInt(data.bank)) return message.reply("❌ **Vous n'avez pas autant d'argent à retirer!**");
        } else {
            if(montant % 1 != 0 || montant <= 0) return message.reply("❌ **Vous n'avez pas indiqué un montant valide à retirer!**");
            if (parseInt(montant) > parseInt(data.bank)) return message.reply("❌ **Vous n'avez pas autant d'argent à retirer!**");
        }
        await userSchema.findOneAndUpdate(
            { guildID: message.guild.id, userID: message.author.id },
            {
                $inc: { cash: montant, bank: -montant },
            }
        );
        data = await userSchema.findOne({guildID: message.guild.id ,userID: message.author.id});

        return message.reply({embeds: [new EmbedBuilder().setColor('Green').setTitle(`✅ Argent retiré`).setDescription(`\`${montant.toLocaleString('en-US')}\`€ ont été retirés en cash !\n\n👛 **Cash actuel :** \`${data.cash.toLocaleString('en-US')}\`€`)]})
    }
 };
