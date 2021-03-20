const UserConfig = require("../database/schema/UserConfig");

module.exports = {
  name: "highscore",
  description: "List your current call or streak highscore!",
  usage: "!highscore <call | gn | gm> [user_ping]",
  execute: async (message, args) => {
    try {
      if (args[0].toLowerCase() !== "call" && args[0].toLowerCase() !== "gn" && args[0].toLowerCase() !== "gm") {
        return message.channel.send("That's not a valid argument! You must say either 'call', 'gn', or 'gm'");
      }
      const userID = (args[1] ? args[1] : message.author.id).replace(/[<>@!]/g, "");
      const user = await UserConfig.findOne({
        userID
      });
      if (args[0] === 'call') {
        let time = user.callTimes.highscore;
        if (time >= 3600) {
          time = (time / 3600).toFixed(2);
          return message.channel.send(`<@${userID}>'s longest call time is ${time} hours!`);
        } else if (time >= 60) {
          time = (time / 60).toFixed(2);
          return message.channel.send(`<@${userID}>'s longest call time is ${time} minutes!`);
        } else {
          return message.channel.send(`<@${userID}>'s longest call time is ${time} seconds!`);
        }
      } else if (args[0] === 'gn') {
        return message.channel.send(`<@${userID}>'s longest gn streak is ${user.streaks.gnHighscore} days!`);
      } else if (args[0] === 'supsup') {
        return message.channel.send(`<@${userID}>'s longest supsup streak is ${user.streaks.gmHighscore} days!`)
      }
    } catch (err) {
      console.error(err);
    }
  }
}