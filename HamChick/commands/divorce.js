const UserConfig = require("../database/schema/UserConfig.js");

module.exports = {
  name: "divorce",
  description: "Divorce a spouse!",
  usage: "!divorce <ping>",
  execute: async (message, args) => {
    try {
      if (!args[0]) {
        return message.channel.send(`Usage: ${module.exports.usage}`);
      }
      const divorceeID = args[0].replace(/[!<>@]/g, "")
      const divorcerID = message.author.id
      if (divorcee === divorcer) {
        return message.channel.send("Yeah, don't know what you were expecting trying to divorce yourself.");
      }
      const divorcee = UserConfig.findOne({
        userID: divorceeID
      });
      const divorcer = UserConfig.findOne({
        userID: divorcerID
      });

      if (divorcee.marriage.marriages.includes(divorcerID)) {
        divorcee.marriage.marriages.splice(divorcee.marriage.marriages.indexOf(divorcerID), 1);
        divorcer.marriage.marriages.splice(divorcee.marriage.marriages.indexOf(divorceeID), 1);
        await UserConfig.updateOne({
          userID: divorceeID
        }, divorcee);
        await UserConfig.updateOne({
          userID: divorcerID
        }, divorcer);
        return message.channel.send(`Yeah <@${divorceeID}>, it's very clearly you and not <@${divorcerID}> 💔`);
      } else {
        return message.channel.send(`<@${divorcerID}>, I don't know if you know how divorce works or not but you have to be married to the person before you divorce them.`);
      }
    } catch (err) {
      console.error(err);
    }
  }
}