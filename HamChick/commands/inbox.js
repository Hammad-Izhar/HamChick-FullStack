const { MessageEmbed } = require("discord.js");
const UserConfig = require("../database/schema/UserConfig")

module.exports = {
  name: "inbox",
  description: "Display all proposals",
  usage: "!inbox",
  execute: async (message, args) => {
    try {
      const userID = message.author.id;
      const user = await UserConfig.findOne({
        userID
      });
      console.log(user);
      const outputEmbed = new MessageEmbed()
        .setColor(0xff0000)
        .setTitle(`${user.username}'s proposals`);
      for (let i = 0; i < user.marriage.marriageInbox; i++) {
        const proposal = message.channel.guild.member(user.marriage.marriageInbox[i])
        if (proposal) {
          outputEmbed.addField(`${i + 1}`, `${proposal}`)
        }
      }
      return message.channel.send(outputEmbed);
    } catch (err) {
      console.error(err);
    }
  }
}