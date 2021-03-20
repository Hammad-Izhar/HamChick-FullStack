const UserConfig = require("../database/schema/UserConfig");

module.exports = {
  name: "ping",
  description: "Toggle whether the bot pings you when you disconnect from a call",
  usage: "!ping",
  execute: async (message, args) => {
    try {
      const userID = message.author.id;
      let user = await UserConfig.findOne({
        userID
      });
      user.callTimes.ping = !user.callTimes.ping;
      await UserConfig.updateOne({
        userID
      }, user);
      return message.channel.send(`<@${userID}>, pinging is now set to: ${user.callTimes.ping}.`)
    } catch (err) {
      console.error(err)
    }
  }
}