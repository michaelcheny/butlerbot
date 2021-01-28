const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

module.exports = class NbaStatsCommand extends (
  Command
) {
  constructor(client) {
    super(client, {
      name: 'mmastats',
      group: 'sports',
      memberName: 'mmastats',
      description: 'Returns the stats of a mma athlete.',
    });
  }

  async run(message, args) {
    if (!args.length)
      return message.say(
        "You didn't provide any arguments. Try `!mmastats [First Name] [Last Name]` "
      );
    // let player = await fetchPlayer(args);
    // let playerStatMsg = await buildPlayer(player);
    // return message.say(playerStatMsg);
  }
};
