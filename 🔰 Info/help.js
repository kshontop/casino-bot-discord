const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix } = require('../../../config')
module.exports = {
  name: "help",
  aliases: ["aide"],
  cooldown: 2000,
  run: async (client, message, args) => {
    const categories = readdirSync('./src/commands/normal');

    if (args[0]) {
      const commande = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(args[0].toLowerCase()));
      const categorie = categories.find(categorie => categorie.toLowerCase().endsWith(args[0].toLowerCase()));
      if (commande) {
        let embed = new EmbedBuilder()
          .setTitle(`Commande \`${commande.name}\``)
          .setColor('Random');

        if (commande.desc) embed.addFields([{ name: `✍ Description`, value: `\`\`\`${commande.desc}\`\`\`` }]);
        if (commande.aliases && commande.aliases.length >= 1) embed.addFields([{ name: `✅ Alias`, value: `${commande.aliases.map(alias => `\`${alias}\``).join(", ")}` }],);
        if (commande.permissions && commande.permissions.length >= 1) embed.addFields([{ name: `👤 Permissions`, value: `${commande.permissions.map(permission => `\`${permission}\``).join(", ")}` }],);
        if (commande.permissions_bot && commande.permissions_bot.length >= 1) embed.addFields([{ name: `🤖 Permissions Bot`, value: `${commande.permissions_bot.map(permission => `\`${permission}\``).join(", ")}` }],);

        return message.reply({ embeds: [embed] })
      } else if (categorie) {
        const commandes_des_categorie = readdirSync(`./src/commands/normal/${categorie}`).filter(archive => archive.endsWith('.js'));
        return message.reply({
          embeds: [new EmbedBuilder()
            .setTitle(`${categorie.split(" ")[0]} ${categorie.split(" ")[1]} ${categorie.split(" ")[0]}`)
            .setColor('Random')
            .setDescription(commandes_des_categorie.length >= 1 ? `>>> *${commandes_des_categorie.map(commande => `\`${commande.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Il n'y a pas encore de commandes dans cette catégorie...*`)
          ]
        })
      } else {
        return message.reply(`❌ **La commande que vous avez spécifiée est introuvable!**\nUtilise \`${prefix}help\` pour voir les commandes et les catégories!`)
      }
    } else {

      var paginaActual = 0;
      let ayuda_embed = new EmbedBuilder()
        .setTitle(`Aide de __${client.user.tag}__`)
        .setColor('Random')
        .addFields([{ name: `📈 **--STATISTIQUES--**`, value: `⚙ **${client.commands.size} Commandes**\n📁 sur **${client.guilds.cache.size} Serveurs**` }],)

      let embeds_pages = [ayuda_embed];

      categories.map((categoria, index) => {
        const comandos_de_categoria = readdirSync(`./src/commands/normal/${categoria}`).filter(archivo => archivo.endsWith('.js'));

        let embed = new EmbedBuilder()
          .setTitle(`${categoria.split(" ")[0]} ${categoria.split(" ")[1]} ${categoria.split(" ")[0]}`)
          .setColor('Random')
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setDescription(comandos_de_categoria.length >= 1 ? `>>> *${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Il n'y a pas encore de commandes dans cette catégorie...*`)
          .setFooter({ text: `Page ${index + 2} / ${categories.length + 1}` })
        embeds_pages.push(embed)
      })
      const seleccion = new ActionRowBuilder().addComponents(new SelectMenuBuilder()
        .setCustomId(`SelecciónMenuAyuda`)
        .setPlaceholder('Choix')
        .addOptions(categories.map(categoria => {
          let objeto = {
            label: categoria.split(" ")[1].substring(0, 50),
            value: categoria,
            description: `Voir les commandes ${categoria.split(" ")[1].substring(0, 50)}`,
            emoji: categoria.split(" ")[0],
          }
          return objeto;
        }))
      )

      const botones = new ActionRowBuilder().addComponents([
        new ButtonBuilder().setStyle('Success').setLabel("Précedent").setCustomId("Atrás"),
        new ButtonBuilder().setStyle('Primary').setLabel("Accueil").setCustomId("Inicio"),
        new ButtonBuilder().setStyle('Success').setLabel("Suivant").setCustomId("Avanzar"),
      ])
      let mensaje_ayuda = await message.reply({ embeds: [ayuda_embed], components: [seleccion, botones] });

      const collector = mensaje_ayuda.createMessageComponentCollector({ filter: i => i.isButton() || i.isSelectMenu() && i.user && i.message.author.id == client.user.id, time: 180e3 });

      collector.on("collect", async (interaccion) => {
        if (interaccion.isButton()) {
          if (interaccion.user.id !== message.author.id) return;
          switch (interaccion.customId) {
            case "Atrás": {
              //Resetemamos el tiempo del collector
              collector.resetTimer();
              //Si la pagina a retroceder no es igual a la primera pagina entonces retrocedemos
              if (paginaActual !== 0) {
                //Resetemamos el valor de pagina actual -1
                paginaActual -= 1
                //Editamos el embeds
                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                await interaccion?.deferUpdate();
              } else {
                //Reseteamos al cantidad de embeds - 1
                paginaActual = embeds_pages.length - 1
                //Editamos el embeds
                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                await interaccion?.deferUpdate();
              }
            }
              break;

            case "Inicio": {
              //Resetemamos el tiempo del collector
              collector.resetTimer();
              //Si la pagina a retroceder no es igual a la primera pagina entonces retrocedemos
              paginaActual = 0;
              await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
              await interaccion?.deferUpdate();
            }
              break;

            case "Avanzar": {
              //Resetemamos el tiempo del collector
              collector.resetTimer();
              //Si la pagina a avanzar no es la ultima, entonces avanzamos una página
              if (paginaActual < embeds_pages.length - 1) {
                //Aumentamos el valor de pagina actual +1
                paginaActual++
                //Editamos el embeds
                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                await interaccion?.deferUpdate();
                //En caso de que sea la ultima, volvemos a la primera
              } else {
                //Reseteamos al cantidad de embeds - 1
                paginaActual = 0
                //Editamos el embeds
                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                await interaccion?.deferUpdate();
              }
            }
              break;

            default:
              break;
          }

        } else {
          let embeds = [];
          for (const seleccionado of interaccion.values) {
              //definimos los comandos leyendo la ruta del valor seleccionado del menú
              const comandos_de_categoria = readdirSync(`./src/commands/normal/${seleccionado}`).filter(archivo => archivo.endsWith('.js'));

              let embed = new EmbedBuilder()
              .setTitle(`${seleccionado.split(" ")[0]} ${seleccionado.split(" ")[1]} ${seleccionado.split(" ")[0]}`)
              .setColor('Random')
              .setThumbnail(message.guild.iconURL({ dynamic: true }))
              .setDescription(comandos_de_categoria.length >= 1 ? `>>> *${comandos_de_categoria.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Il n'y a pas encore de commandes dans cette catégorie...*`)

              embeds.push(embed)
          }
          interaccion.reply({ embeds, ephemeral: true })
        }
      })

      collector.on("end", () => {
      })
    }
  }
};
