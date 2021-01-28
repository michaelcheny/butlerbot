const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const config = require('./config');

const client = new CommandoClient({
  owner: config.ownerID,
  commandPrefix: config.prefix,
  disableEveryone: true,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['sports', 'Sport commands'],
    ['tool', 'Handy tools commands'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}! (ID: ${client.user.id})`);
  // client.user.setActivity('', { type: 'WATCHING' });
});

client.on('error', console.error);

client.login(config.botToken);
