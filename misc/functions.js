const userSchema = require('../Models/user');
const discord = require('discord.js');

module.exports = {
  verification_user , addCooldownField
}

async function verification_user(guildid, userid, message) {
  if(userid) {
    let userdata = await userSchema.findOne({
      guildID: guildid,
      userID: userid,
    });

    if(!userdata) {
      userdata = await new userSchema({
        guildID: guildid,
        userID: userid,
      });
      await userdata.save();
      await message.reply('Votre profil a été créé. Veuillez retaper la commande.');
      throw new Error('ProfileCreated');
    }
  }
}

async function addCooldownField() {
  await userSchema.updateMany(
    { $or: [
      { "inv": { $exists: false } },
    ]},
    { 
      $set: {
        "inv": [],
      }
    }
  );



  console.log("Champs cooldowns.slut ajoutés à tous les utilisateurs existants.");
}