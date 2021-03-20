Hello! This HamChick (don't mind the silly name), a Discord bot I made earlier this year for some of my friends and have been adding features to from time to time. It all started because we have this friend who would constantly leave and join call. We would all joke about her ridiculously short call times and wanted a way to keep track of how long she stayed in call at any given time. Therefore, HamChick was born with its first (and primary) feature: call time tracking. HamChick keeps track of when a user joins and leaves a call and saves that to MongoDB. Other features of the bot include:

- Marry your friends!

- Keep track of good morning and good night streaks!

- GIF search

You can see the original source code in another GitHub repository on this GitHub account. For the project I rewrote some of the code opting to use Mongoose over native MongoDB. More features are coming to the bot as I get time to add them and soon it will be hosted on a REPL.IT server. Currently, the old version is hosted, but this new and improved bot should be up by Monday. You can also run it locally too. Just DM me on Slack or Discord (Hammy#4172) for the .env files.

./HamChick contains all the bot source files\
./backend contains the Express API\
./frontend contains the React Website

To Do:

- Fix Static Pages on the Website

- !highscore, !lowscore, !ping, !bind, !prefix

- Change call times to use mutable objects

- Host on REPL.IT

Contributions:

- Hammad: Discord Bot, Express Server API, React Navbar and Animations

- Jeremy: Profile Design and Integrations