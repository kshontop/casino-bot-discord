const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const userSchema = require('../../../Models/user');
module.exports = {
    name: "balance",
    aliases: ["bal", "money", "argent"],
    cooldown: 2000,
    run: async (client, message, args) => {
      const user = message.guild.members.cache.get(args[0]) || message.mentions.members.filter(m => m.guild.id == message.guild.id).first() || message.member;
      if(user.user.bot) return message.reply({ content: "❌ **Les bots ne peuvent pas avoir d'argent !**"});
      
      let data = await userSchema.findOne({ guildID: message.guild.id , userID: user.user.id});
      if(!data) return message.reply('❌ Cet utilisateur n\'a pas de profil !');

      const amount = data.bank + data.cash;
      const formattedAmount = amount.toLocaleString('en-US');
      const embed = new EmbedBuilder()

      .setColor('Gold')
      .setTitle(`Argent de ${user.user.username}`)
      .addFields(
          {
              name: "💵 Liquide:",
              value: `\`${data.cash.toLocaleString('en-US')}\`€`,
              inline: true
          },
          {
              name: "🏦 Banque:",
              value: `\`${data.bank.toLocaleString('en-US')}\`€`,
              inline: true
          },
          {
            name: ":coin: Total",
            value: `\`${formattedAmount}\`€`,
            inline: true
          }
      )

      await message.reply({embeds: [embed]})
    }
 };
