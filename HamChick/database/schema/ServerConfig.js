const mongoose = require('mongoose');

const ServerConfigScheme = new mongoose.Schema({
  serverName: {
    type: String,
    required: true
  },
  serverID: {
    type: String,
    required: true,
    unique: true
  },
  icon: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    required: true,
    default: "!"
  },
  logChannel: {
    type: String,
    default: ''
  },
  gn: {
    type: String,
    default: 'gn'
  },
  gm: {
    type: String,
    default: 'gm'
  }
});

module.exports = mongoose.model('ServerConfig', ServerConfigScheme);