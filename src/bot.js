const Discord = require('discord.js');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const dc = new Discord.Client();
const { registerPeople } = require('./utils/register');
dc.people = new Discord.Collection();
registerPeople(dc);


dc.on('voiceStateUpdate', (oldState, newState) => {
  if (oldState.channelID === newState.channelID) return;
  if (newState.member.user.bot) return;
  if (newState.channelID === null) return;
  if (!dc.people.has(newState.id)) return;
  console.log('Hello World');
  dc.people.get(newState.id).run(dc, oldState, newState);
});

dc.login(process.env.TOKEN);
