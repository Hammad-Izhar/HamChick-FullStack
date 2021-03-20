const UserConfig = require("../database/schema/UserConfig");

module.exports = {
  name: "reject",
  description: "Reject someone's proposal",
  execute: async (message, args) => {
    try {
      if (!args[0]) {
        return message.channel.send(`But who do you want to reject?`);
      }
      const rejecterID = message.author.id;
      const rejectedID = args[0].replace(/[<>@!]/g, "");
      if (rejecterID === rejectedID) {
        return message.channel.send("How does one reject themeself?");
      }
      let rejecter = await UserConfig.findOne({
        userID: rejecterID
      });
      if (rejecter.marriage.marriageInbox.includes(rejectedID)) {
        rejecter.marriage.marriageInbox.splice(rejecter.marriage.marriageInbox.indexOf(rejectedID), 1);
        await UserConfig.updateOne({
          userID: rejecterID
        }, rejecter);
        return message.channel.send(`<@${rejectedID}>, yeah you don't make the cut. I knew you were way out of <@${rejecterID}>'s league.`);
      } else {
        message.channel.send("Either that person doesn't exist or they don't like you enough to ask you out. :person_shrugging:")
      }
    } catch (err) {
      console.error(err);
    }
  }
}