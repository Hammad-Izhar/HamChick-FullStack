const ServerConfig = require("../database/schema/ServerConfig");

module.exports = {
  name: "prefix",
  description: "Set the server prefix to something else or view the current value!",
  usage: "!prefix <prefix>",
  execute: async (message, args) => {
    const serverID = message.guild.id;
    let server = await ServerConfig.findOne({
      serverID
    });
    console.log(server);
    if (!args[0]) {
      return message.channel.send(`The current prefix is: ${server.prefix}`)
    }
    server.prefix = args[0];
    await ServerConfig.updateOne({
      serverID
    }, server);
    return message.channel.send(`The current prefix is: ${server.prefix}`)
  }
}