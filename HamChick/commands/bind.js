const ServerConfig = require("../database/schema/ServerConfig");

module.exports = {
  name: "bind",
  description: "Binds the bot output channel to the current text channel",
  usage: "!bind",
  execute: async (message, args) => {
    const serverID = message.guild.id;
    let server = await ServerConfig.findOne({serverID});
    server.logChannel = message.channel.id;
    await ServerConfig.updateOne({serverID}, server);
    return message.channel.send(`Successfully bound channel to <#${server.logChannel}>`);
  }
}