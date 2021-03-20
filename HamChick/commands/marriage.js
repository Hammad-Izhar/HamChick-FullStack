const UserConfig = require("../database/schema/UserConfig");

module.exports = {
  name: "marriage",
  description: "List a person's current marriages",
  usage: "!marriage [user_ping]",
  execute: async (message, args) => {
    try {
      const userID = (args[0] ? args[0] : message.author.id).replace(/[<>!@]/g, "");
      let user = await UserConfig.findOne({
        userID
      });
      if (user.marriage.marriages.length === 1) {
        return message.channel.send(`<@${userID}> is exclusively with <@${userObj.marriage.marriages[0]}>$`)
      } else if (user.marriage.marriages.length > 1) {
        let output = "";
        for (i = 0; i < user.marriage.marriages.length - 1; i++) {
          output += `<@${user.marriage.marriages[i]}>, `
        }
        output += `and <@${user.marriage.marriages[user.marriage.marriages.length-1]}>`
        return message.channel.send(`Look at this whore! He/She is ${user.marriage.marriages.length}-timing with ${output}!`);
      } else {
        return message.channel.send(`<@${userID}> hasn't married anyone yet!`);
      }
    } catch (err) {
      console.error(err);
    }
  }
}