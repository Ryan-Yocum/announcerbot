const Discord = require('discord.js');
const fsp = require('fs').promises;
const fs = require('fs');
const path = require('path');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const dc = new Discord.Client();
const { registerPeople } = require('./utils/register');
dc.people = new Discord.Collection();
registerPeople(dc);


dc.on('voiceStateUpdate', async (oldState, newState) => {
  if (oldState.channelID === newState.channelID) return;
  if (newState.member.user.bot) return;
  if (newState.channelID === null) return;
  if (!dc.people.has(newState.id)) return;
  dc.people.get(newState.id).run(dc, oldState, newState);
});

dc.on('voiceStateUpdate', async (oldState, newState) => {
  if (oldState.channelID !== newState.channelID) return;
  if (newState.member.user.bot) return;
  if (newState.channelID === null) return;
  if ((oldState.streaming === false) && (newState.streaming === true)) {
    const conn = await newState.channel.join();
    let dir = path.join(__dirname, 'static', 'stream');
    let files = await fsp.readdir(dir);
    let file = files[Math.floor(Math.random() * files.length)]
    conn.play(fs.createReadStream(path.join(dir, file)), { volume: 0.5 });
    setTimeout(() => {
      conn.disconnect();
    }, 10000);
  }
});


dc.login(process.env.TOKEN);
