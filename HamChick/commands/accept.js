const UserConfig = require("../database/schema/UserConfig.js");

module.exports = {
  name: "accept",
  description: "Accept a proposal!",
  usage: `!accept <ping>`,
  execute: async (message, args) => {
    try {
      if (!args[0]) {
        return message.channel.send(`Usage: ${module.exports.usage}`);
      } else {
        const accepterID = message.author.id;
        const suitorID = args[0].replace(/[!<>@]/g, "");

        let accepter = await UserConfig.findOne({
          userID: accepterID
        });
        let suitor = await UserConfig.findOne({
          userID: suitorID
        });

        if (accepter.marriage.marriageInbox.includes(suitorID)) {
          accepter.marriage.marriageInbox.splice(accepter.marriage.marriageInbox.indexOf(suitorID), 1);
          accepter.marriage.marriages.push(suitorID);
          suitor.marriage.marriages.push(accepterID);

          await UserConfig.updateOne({
            "id": accepterID
          }, accepter)
          await UserConfig.updateOne({
            "id": suitorID
          }, suitor)
          return message.channel.send(`Congratulate <@${suitorID}> and <@${accepterID}> for their new marriage!`);
        } else {
          return message.channel.send(`That person hasn't proposed to you. Maybe you should try taking the first move.`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}