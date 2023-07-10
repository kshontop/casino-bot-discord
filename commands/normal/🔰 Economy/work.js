const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const userSchema = require('../../../Models/user');
const prettyMilliseconds = require('pretty-ms');
const { WorkResponses } = require("../../../misc/work-responses");
module.exports = {
    name: "work",
    aliases: [],
    cooldown: 2000,
    run: async (client, message, args) => {


        let temps = 4 * 60 * 60 * 1000;
        const i = randomIntFromInterval(0,WorkResponses.length-1);
        var text = WorkResponses[i].text;
        var averageAmount = WorkResponses[i].averageAmount;

        let data = await userSchema.findOne({ guildID: message.guild.id, userID: message.author.id });

        if (data.cooldowns.work > Date.now()) {
            return message.reply({ embeds: [new EmbedBuilder().setTitle('Pas si vite !').setColor('DarkRed')
        .setDescription(`Vous ne pourrez travailler que dans \`${prettyMilliseconds(data.cooldowns.work - Date.now(), { verbose: false, secondsDecimalDigits: 0 })}\``).setColor('Random')]})
        } 

        const montant = ["0", "1000", "2"];
        var min = parseInt(montant[0]);
        var max = parseInt(montant[1]);

        let number = parseInt( (averageAmount/100)*(max-min)+min );
        const amount = parseInt( randomIntFromInterval( number-(0.1*(max-min)) , number+(0.1*(max-min)) ) );

        var wonMontant;

        if (amount < min) {
            wonMontant = amount + (min-amount);
        } else if (amount > max) { 
            wonMontant = amount - (amount-max);
        } else {
            wonMontant = amount;
        }

        if (isNaN(wonMontant)) return

        await userSchema.findOneAndUpdate(
            { guildID: message.guild.id, userID: message.author.id },
            {
                $inc: { cash: wonMontant },
                $set: { "cooldowns.work": Date.now() + temps }
            }
        );
        var embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle(`⛏ Travail`)
        .setDescription(`${text} \`${wonMontant}\`€`)

        return message.reply({embeds: [embed]})
    
    }
};



function randomIntFromInterval(mina, maxa) { 
    return Math.floor(Math.random() * (maxa - mina + 1) + mina)
}

