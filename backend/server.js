require('dotenv').config();
require('./strategies/discord.js');

const express = require('express');
const server = express();
const session = require('express-session');
const Store = require('connect-mongo');
const passport = require('passport');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 9000;
const routes = require('./routes/index.js');
const cors = require('cors');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bv6zc.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

server.use(session({
  secret: process.env.ENCRYPT,
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  resave: false,
  saveUninitialized: false,
  store: Store.create({
    mongoUrl: uri
  })
}));
server.use(passport.initialize());
server.use(passport.session());
server.use('/api', routes);

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));