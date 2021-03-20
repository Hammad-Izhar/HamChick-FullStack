const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const UserConfig = require('../database/schema/UserConfig.js');

passport.serializeUser((user, done) => done(null, user.userID));
passport.deserializeUser(async (userID, done) => {
  try {
    const user = await UserConfig.findOne({
      userID
    })
    return done(null, user);
  } catch (err) {
    done(err, userID);
  }
})

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CLIENT_CALLBACK,
  scope: ['identify']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await UserConfig.findOne({
      userID: profile.id
    });
    if (user) {
      const newUser = await UserConfig.findOneAndUpdate({
        userID: profile.id
      }, {
        username: profile.username,
        userID: profile.id,
        avatar: profile.avatar
      }, {
        new: true
      });
      console.info('Found and updated an existing user.')
      return done(null, newUser);
    } else {
      const newUser = await UserConfig.create({
        username: profile.username,
        userID: profile.id,
        avatar: profile.avatar
      });
      console.info('Made a new user.')
      return done(null, newUser);
    }
  } catch (err) {
    return done(err, user);
  }
}));