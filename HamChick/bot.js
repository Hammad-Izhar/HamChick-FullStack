const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const ServerConfig = require('./database/schema/ServerConfig');
const UserConfig = require('./database/schema/UserConfig')
const { dateEqual } = require('./helpers/dateEqual.js');
const { dateGreater } = require('./helpers/dateGreater.js');
require('dotenv').config();
const DiscordClient = new Discord.Client();

DiscordClient.commands = new Discord.Collection();
const discordCommands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of discordCommands) {
  const command = require(`./commands/${file}`);
  DiscordClient.commands.set(command.name, command);
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bv6zc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

DiscordClient.login();
DiscordClient.on('ready', () => {
  console.info('Logged on and ready to rumble!');
});

DiscordClient.on('guildCreate', async (guild) => {
  try {
    if (guild.available) {
      await ServerConfig.create({
        serverName: guild.name,
        serverID: guild.id,
        icon: guild.icon
      });
    }
  } catch (err) {
    console.error(err);
  }
});

DiscordClient.on('guildDelete', async (guild) => {
  try {
    if (guild.available) {
      await ServerConfig.deleteOne({
        serverID: guild.id
      });
    }
  } catch (err) {
    console.error(err);
  }
});

DiscordClient.on('message', async (message) => {
  const args = message.content.split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (message.author.bot) return;
  const server = await ServerConfig.findOne({
    serverID: message.guild.id
  });
  const prefix = server.prefix;
  const goodNight = RegExp(`\\b\\W*${server.gn}\\W*\\b`, 'i');
  const goodMorning = RegExp(`\\b\\W*${server.gm}\\W*\\b`, 'i');

  if (message.content.startsWith(prefix) && DiscordClient.commands.has(cmd.slice(prefix.length))) {
    DiscordClient.commands.get(cmd.slice(prefix.length)).execute(message, args);
  } else if (message.content.endsWith('.')) {
    try {
      const query = `http://api.giphy.com/v1/gifs/search?q=${message.content.slice(0, -1).replace(" ", "%20")}&api_key=${process.env.GIPHY_PASS}&limit=${process.env.GIF_LIMIT}`;
      const data = await fetch(query)
        .then(response => response.json())
        .catch(err => console.error(err));
      const index = Math.floor(Math.random() * ((data.data.length) - 1));

      if (data.data[0]) {
        const url = data.data[index].images.original.url;
        gifEmbed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setImage(url);
        message.channel.send(gifEmbed);
      }
    } catch (err) {
      console.error(err);
    }
  } else if (goodNight.test(message.content)) {
    console.info('Someone said gn!');
    let user = await UserConfig.findOne({
      userID: message.author.id
    });

    const currentTime = new Date();

    if (currentTime.getHours() >= 21 || currentTime.getHours() <= 2) { // 21 -> 9EST and 2 -> 2EST
      if (!user.streaks.gnTime) {
        console.info('First Time!');
        user.streaks.gnTime = new Date();
        user.streaks.gnStreak = 1;

        if (user.streaks.gnHighscore < user.streaks.gnStreak) {
          user.streaks.gnHighscore = user.streaks.gnStreak;
        }

        await UserConfig.findOneAndUpdate({
          userID: message.author.id
        }, user);

        return message.channel.send(`Good night <@${user.userID}>! First time! Keep up the good work! 🌙`)
      } else if (user.streaks.gnTime) {
        let prevDate = new Date(user.streaks.gnTime)
        if (dateEqual(new Date(prevDate.setDate(prevDate.getDate() + 1)), currentTime)) {
          console.info('Streaking!');
          user.streaks.gnTime = new Date();
          user.streaks.gnStreak += 1;

          if (user.streaks.gnHighscore < user.streaks.gnStreak) {
            user.streaks.gnHighscore = user.streaks.gnStreak;
          }

          await UserConfig.findOneAndUpdate({
            userID: message.author.id
          }, user);

          if (user.streaks.gnStreak % 5 == 0 || user.streaks.gnStreak == 69) {
            return message.channel.send(`Good night! <@${user.userID}> is on a ${user.streaks.gnStreak} night streak! 🌕`);
          } else {
            return message.channel.send(`Good night <@${user.userID}>!`)
          }
        } else if (dateGreater(new Date(prevDate.setDate(prevDate.getDate() + 1)), currentTime)) {
          return message.channel.send(`Oops! It's too early! Try again in ${22 - currentTime.getHours()} hours!`)
        } else {
          console.log('Lost Streak.')
          user.streaks.gnTime = new Date();
          user.streaks.gnStreak = 1;

          await UserConfig.findOneAndUpdate({
            userID: message.author.id
          }, user);

          return message.channel.send('Damn it! You lost your streak! Try again! 🌑')
        }
      }
    } else {
      return message.channel.send(`Oops! It's too early! Try again in ${23 - currentTime.getHours()} hours!`)
    }
  } else if (goodMorning.test(message.content)) {
    console.info('Someone said gm!');
    let user = await UserConfig.findOne({
      userID: message.author.id
    });

    const currentTime = new Date();
    console.log(currentTime.getHours());
    if (currentTime.getHours() >= 22 && currentTime.getHours() <= 23) { // 5 -> 5EST and 12 -> 12EST
      if (!user.streaks.gmTime) {
        console.info('First Time!');
        user.streaks.gmTime = new Date();
        user.streaks.gmStreak = 1;

        if (user.streaks.gmHighscore < user.streaks.gmStreak) {
          user.streaks.gmHighscore = user.streaks.gmStreak;
        }

        await UserConfig.findOneAndUpdate({
          userID: message.author.id
        }, user);

        return message.channel.send(`Good morning <@${user.userID}>! First time! Keep up the good work! 🌞`)
      } else if (user.streaks.gmTime) {
        let prevDate = new Date(user.streaks.gmTime)
        if (dateEqual(new Date(prevDate.setDate(prevDate.getDate() + 1)), currentTime)) {
          console.info('Streaking!');
          user.streaks.gmTime = new Date();
          user.streaks.gmStreak += 1;

          if (user.streaks.gmHighscore < user.streaks.gmStreak) {
            user.streaks.gmHighscore = user.streaks.gmStreak;
          }

          await UserConfig.findOneAndUpdate({
            userID: message.author.id
          }, user);

          if (user.streaks.gmStreak % 5 == 0 || user.streaks.gmStreak == 69) {
            return message.channel.send(`Good morning! <@${user.ID}> is on a ${user.streaks.gmStreak} day streak! 🌕`);
          } else {
            return message.channel.send(`Good morning <@${user.userID}>!`)
          }
        } else if (dateGreater(new Date(prevDate.setDate(prevDate.getDate() + 1)), currentTime)) {
          return message.channel.send(`Oops! It's too early! Try again in ${23 - currentTime.getHours()} hours!`)
        } else {
          console.log('Lost Streak.')
          user.streaks.gmTime = new Date();
          user.streaks.gmStreak = 1;

          await UserConfig.findOneAndUpdate({
            userID: message.author.id
          }, user);

          return message.channel.send('Damn it! You lost your streak! Try again! 🌥')
        }
      }
    } else {
      message.channel.send(`Oops! It's too early! Try again in ${Math.abs(22 - currentTime.getHours())} hours!`)
    }
  }
});

DiscordClient.on('voiceStateUpdate', async (oldState, newState) => {
  try {
    console.info('Got a voice update!')
    if (!oldState.channelID) {
      const user = await UserConfig.findOne({
        userID: oldState.id
      });
      if (user) {
        await UserConfig.findOneAndUpdate({
          userID: oldState.id
        }, {
          callTimes: {
            scores: user.callTimes.scores,
            joinTime: new Date(),
            highscore: user.callTimes.highscore,
            lowscore: user.callTimes.lowscore,
            ping: user.callTimes.ping
          }
        });
        console.info("A user has been updated!.");
      } else {
        await UserConfig.create({
          username: oldState.member.user.username,
          userID: oldState.id,
          avatar: oldState.member.user.avatar,
          callTimes: {
            joinTime: new Date()
          }
        });
        console.info("A user has been created!.");
      }
    } else if (!newState.channelID) {
      const user = await UserConfig.findOne({
        userID: oldState.id
      });
      const newScore = (Date.now() - (new Date(user.callTimes.joinTime)).getTime()) / 1000;
      let output = "";
      let special = "";
      let highscore = user.callTimes.highscore;
      let lowscore = user.callTimes.lowscore;

      if (!highscore) {
        console.log("No Highscore Found!")
        highscore = newScore;
      } else if (highscore < newScore) {
        highscore = newScore;
        special = "That's a new highscore!"
      }

      if (!lowscore) {
        console.log("No Lowscore Found!")
        lowscore = newScore
      } else if (newScore < lowscore) {
        lowscore = newScore
        special = "That's a new lowscore!"
      }

      if (user.callTimes.ping) {
        if (newScore > 3600) {
          output = `<@${user.userID}> was in a voice channel for ${(newScore/3600).toFixed(2)} hours!`
        } else if (newScore > 60) {
          output = `<@${user.userID}> was in a voice channel for ${(newScore/60).toFixed(2)} minutes!`
        } else {
          output = `<@${user.userID}> was in a voice channel for ${newScore} seconds!`
        }
        const server = await ServerConfig.findOne({
          serverID: oldState.guild.id
        });
        if (server.logChannel) {
          const channel = server.logChannel;
          oldState.guild.channels.cache.get(channel).send(("DISREGARD THIS MESSAGE: " + output + " " + special).trim());
        }
      }

      await UserConfig.findOneAndUpdate({
        userID: oldState.id
      }, {
        callTimes: {
          scores: [newScore, ...user.callTimes.scores],
          joinTime: null,
          highscore: highscore,
          lowscore: lowscore,
          ping: user.callTimes.ping
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
});