const { Command } = require('discord.js-commando');

module.exports = class NbaStatsCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: 'nbastats',
      group: 'sports',
      memberName: 'nbastats',
      description: 'Returns the stats of a player.',
    });
  }

  async run(message, args) {
    console.log(args);
    return message.say('testing! ' + args);
  }
};
