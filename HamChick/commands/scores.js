const { MessageEmbed } = require("discord.js");
const UserConfig = require("../database/schema/UserConfig");

module.exports = {
  name: "scores",
  description: "Lists a user's top n call times!",
  usage: "!scores [user_ping] [num (≤ 25)]",
  execute: async (message, args) => {
    const userID = (args[0] ? args[0] : message.author.id).replace(/[<>@!]/g, "");
    const num = (args[1] && Number(args[1]) <= 25 ? Number(args[1]) : 10);
    const user = await UserConfig.findOne({userID});
    const scores = [...user.callTimes.scores].sort((a, b) => b - a);
    const outputEmbed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle(`${user.username}'s Top ${num} Call Times!`);
    let output = "";
    for (let i = 0; (i < scores.length && i < num); i++) {
      if (scores[i] >= 3600) {
        output += `${i + 1}. ${(scores[i] / 3600).toFixed(2)} hours\n`;
      } else if (scores[i] >= 60) {
        output += `${i + 1}. {(scores[i] / 60).toFixed(2)} minutes\n`;
      } else {
        output += `${i + 1}. ${(scores[i]).toFixed(2)} seconds\n`;
      }
    }
    return message.channel.send(outputEmbed.setDescription(output));
  }
}