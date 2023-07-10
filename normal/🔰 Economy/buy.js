const { EmbedBuilder } = require("discord.js");
const guildSchema = require('../../../Models/guild');
const userSchema = require('../../../Models/user');
const {prefix} = require('../../../config')

module.exports = {
    name: "buy",
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
            return message.reply({embeds: [embed.setDescription(`Merci de saisir le nom de l'item à acheter.\n\n❗ Exemple: ${prefix}buy chicken`).setColor('Red')]});
        }
        const nomCapitalized = nom.charAt(0).toUpperCase() + nom.slice(1).toLowerCase();
        let data = await userSchema.findOne({ guildID: message.guild.id ,userID: message.author.id });
        let shop = guild.shop;

        if (!shop || shop.length === 0) {
            embed.setColor('Red');
            embed.setDescription(`Aucun item trouvé sur ce serveur. Veuillez créé un item et réessayer.`);
            return message.reply({embeds: [embed]});
        }
        itemIndex = shop.findIndex(item => item.nom === nomCapitalized);
        if (itemIndex === -1) {
            embed.setColor('Red');
            embed.setDescription(`L'item n'existe pas.`);
            return message.reply({embeds: [embed]});
        }

        const selectedItem = shop[itemIndex];
        const itemPrice = selectedItem.prix;

        let existingItem = data.inv.find(item => item.item_name === selectedItem.nom);
        let quantityToAdd = args[1] && !isNaN(args[1]) ? parseInt(args[1]) : 1;
        if(quantityToAdd % 1 != 0 || quantityToAdd <= 0) return message.reply({embeds: [embed.setDescription("❌ Vous n'avez pas indiqué un montant valide! ").setColor('Red')]});
        let totalCost = itemPrice * quantityToAdd;
    
        if (existingItem) {
            if (data.cash >= totalCost) {
                existingItem.quantity += quantityToAdd;
                await data.markModified('inv');
                data.cash -= totalCost;
            } else {
                return message.reply({embeds: [embed.setDescription(`❌ Vous n'avez pas assez d'argent pour acheter cet item. Vous avez actuellement \`${data.cash}\`€ en cash.`).setColor('Red')]});
            }
        } else {
            if (data.cash >= totalCost) {
                let newItem = {
                    item_name: selectedItem.nom,
                    quantity: args[1] && !isNaN(args[1]) ? parseInt(args[1]) : 1
                };
                data.inv.push(newItem);
                await data.markModified('inv');
                data.cash -= totalCost;
            } else {
                return message.reply({embeds: [embed.setDescription(`❌ Vous n'avez pas assez d'argent pour acheter cet item. Vous avez actuellement \`${data.cash}\`€ en cash.`).setColor('Red')]});
            }
        }

        await data.save();

        embed.setDescription(`Vous avez acheté **x${quantityToAdd} ${selectedItem.nom}** !`).setColor('Green');
        return message.reply({embeds: [embed]});


    }
};