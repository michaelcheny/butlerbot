const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const axios = require('axios').default;

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
    if (!args.length)
      return message.say(
        "You didn't provide any arguments. Try `!nbastats [First Name] [Last Name]` "
      );
    let player = await fetchPlayer(args);
    let playerStatMsg = await buildPlayer(player);
    return message.say(playerStatMsg);
  }
};

// fetch player object with name, id, height, weight, etc
const fetchPlayer = async (name) => {
  try {
    let res = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${name}`);
    let { data } = res.data;
    return data[0];
  } catch (err) {
    console.error(err);
  }
};

// retrieves json with player stats current season
const fetchPlayerStats = async (id) => {
  try {
    let res = await axios.get(
      `https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`
    );
    let { data } = res.data;
    return data[0];
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// builds the message for the requested player
const buildPlayer = async (player) => {
  let stats = await fetchPlayerStats(player.id);
  if (stats === undefined) return "This player doesn't have stats for this season.";

  return new MessageEmbed()
    .setColor('#248A00')
    .setTitle(`Stats for ${player.first_name + ' ' + player.last_name}`)
    .setDescription(
      `
  Height: *${player.height_feet + "'" + player.height_inches + '"'}*, Weight: *${
        player.weight_pounds
      }*
    Games Played: *${stats.games_played}*, Avg Mins: *${stats.min}*
    FG%: *${stats.fg_pct}*, FG3%: *${stats.fg3_pct}*, FT%: *${stats.ft_pct}*
    Points: *${stats.pts}*
    Rebound: *${stats.reb}*
    Assist: *${stats.ast}*
    Steals: *${stats.stl}*
    Blocks: *${stats.blk}*
    Turnovers: *${stats.turnover}*
  `
    );
};
