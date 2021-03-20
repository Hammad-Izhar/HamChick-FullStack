const UserConfig = require("../database/schema/UserConfig");

module.exports = {
  name: "streak",
  description: "Check your current streak!",
  usage: "!streak <gn | gm> <user_ping>",
  execute: async (message, args) => {
    const userID = (args[1] ? args[1] : message.author.id).replace(/[<>!@]/g, "");
    if (args[0].toLowerCase() !== "gn" || args[0].toLowerCase() !== "gm") {
      return message.channel.send(`That's not a valid streak name! ${module.exports.usage}`);
    }
    const user = await UserConfig.findOne({
      userID
    });
    if (args[0] === "gn") {
      return message.channel.send(`<@${userID}> is on a ${user.callTimes.gnStreak}-night streak! 🌙`);
    } else {
      return message.channel.send(`<@${userID}> is on a ${user.callTimes.gmStreak}-day streak! 🌞`);
    }
  }
}