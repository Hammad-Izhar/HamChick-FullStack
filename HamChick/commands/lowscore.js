const UserConfig = require("../database/schema/UserConfig");

module.exports = {
  name: "lowscore",
  description: "List your current call lowscore!",
  usage: "!lowscore [user_ping]",
  execute: async (message, args) => {
    try {
      const userID = (args[0] ? args[0] : message.author.id).replace(/[<>@!]/g, "");
      const user = await UserConfig.findOne({
        userID
      });
      let time = user.callTimes.lowscore;
      if (time >= 3600) {
        time = (time / 3600).toFixed(2);
        return message.channel.send(`<@${userID}>'s shortest call time is ${time} hours!`);
      } else if (time >= 60) {
        time = (time / 60).toFixed(2);
        return message.channel.send(`<@${userID}>'s shortest call time is ${time} minutes!`);
      } else {
        return message.channel.send(`<@${userID}>'s shortest call time is ${time} seconds!`);
      }
    } catch (err) {
      console.error(err);
    }
  }
}