const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const userSchema = require('../../../Models/user');
const prettyMilliseconds = require('pretty-ms');
const { CrimeResponses } = require("../../../misc/crime-responses")
module.exports = {
    name: "crime",
    aliases: [],
    cooldown: 2000,
    run: async (client, message, args) => {

        const i = randomIntFromInterval(0,CrimeResponses.length-1);
        var text = CrimeResponses[i].text;
        var averageAmount = CrimeResponses[i].averageAmount;

        let data = await userSchema.findOne({ guildID: message.guild.id ,userID: message.author.id });
        if (data.cooldowns.rob > Date.now()) return message.reply({embeds: [new EmbedBuilder().setColor('DarkRed').setDescription(`Vous pourrez commettre votre prochain crime dans \`${prettyMilliseconds(data.cooldowns.rob - Date.now(), { verbose: false, secondsDecimalDigits: 0 })}\`.`) ]})

        var wonMontant;

        const montant = ["-1000", "1000", "5"];
        var min = parseInt(montant[0]);
        var max = parseInt(montant[1]);

        if (isNeg(min) && isNeg(max)) {
            var min2 = Math.abs(max);
            var max2 = Math.abs(min);
            averageAmount = Math.abs(averageAmount);

            let number = parseInt( (averageAmount/100)*(max2-min2)+min2 );
            const amount = -parseInt( randomIntFromInterval( number-(0.1*(max2-min2)) , number+(0.1*(max2-min2)) ) );

            

            if (amount < min) {
                wonMontant = amount + (min-amount);
            } else if (amount > max) { 
                wonMontant = amount - (amount-max);
            } else {
                wonMontant = amount;
            }
        
        } else if (isNeg(min) && !isNeg(max)) {
            if (!isNeg(averageAmount)) {
                var min2 = 1;
                var max2 = max;

                let number = parseInt( (averageAmount/100)*(max2-min2)+min2 );
                const amount = parseInt( randomIntFromInterval( number-(0.1*(max2-min2)) , number+(0.1*(max2-min2)) ) );
    
                if (amount < min) {
                    wonMontant = amount + (min-amount);
                } else if (amount > max) { 
                    wonMontant = amount - (amount-max);
                } else {
                    wonMontant = amount;
                }
            } else {
                var min2 = 1;
                var max2 = Math.abs(min);
                averageAmount = Math.abs(averageAmount);

                let number = parseInt( (averageAmount/100)*(max2-min2)+min2 );
                const amount = -parseInt( randomIntFromInterval( number-(0.1*(max2-min2)) , number+(0.1*(max2-min2)) ) );
    
                if (amount < min) {
                    wonMontant = amount + (min-amount);
                } else if (amount > max) { 
                    wonMontant = amount - (amount-max);
                } else {
                    wonMontant = amount;
                }
            }
        } else {
            wonMontant = 0;
        }
        if (isNaN(wonMontant)) return

        await userSchema.findOneAndUpdate(
            { guildID: message.guild.id, userID: message.author.id },
            {
                $inc: { cash: wonMontant },
                $set: { "cooldowns.rob": Date.now() + (4 * 60 * 60 * 1000) }
            }
        );
        var embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle(`🔪 Crime`)
        .setDescription(`${text} \`${wonMontant}\`€`)

        if (isNeg(wonMontant)) embed.setColor('Red');
        if (wonMontant === 0) embed.setColor('Grey')
        return message.reply({embeds: [embed]})
    }
};


function randomIntFromInterval(mina, maxa) { 
    return Math.floor(Math.random() * (maxa - mina + 1) + mina)
}

function isNeg(x) {
    if (x !== Math.abs(x)) return true
    else return false
}