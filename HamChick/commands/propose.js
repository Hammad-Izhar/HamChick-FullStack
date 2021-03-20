const UserConfig = require("../database/schema/UserConfig");

module.exports = {
  name: "propose",
  description: "Propose to someone!",
  usage: "!propose <user_ping>",
  execute: async (message, args) => {
    try {
      if (!args[0]) {
        return message.channel.send(`Usage: ${module.exports.usage}`);
      }
      const suitorID = message.author.id;
      const suiteeID = args[0].replace(/[<>@!]/g, "");
      if (suitorID === suiteeID) {
        return message.channel.send("Nope! I'm not going to wingman for your right hand...");
      }
      const suitee = await UserConfig.findOne({
        userID: suiteeID
      });
      if (!suitee.marriage.marriageInbox.includes(suitorID)) {
        suitee.marriage.marriageInbox.push(suitorID);
        await UserConfig.updateOne({
          userID: suiteeID
        }, suitee);
        return message.channel.send(`Yoooooo! <@${suiteeID}> I think you should really consider going out with <@${suitorID}>. They are pretty cute :flushed:`);
      } else {
        return message.channel.send(`Listen <@${suitorID}>. I know you are desperate, but I didn't know you would be that desperate!`);
      }
    } catch (err) {
      console.error(err);
    }
  }
}