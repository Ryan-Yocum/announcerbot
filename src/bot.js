const Discord = require('discord.js');
if (process.env.NODE_ENV !== 'production') require('dotenv').config;
const dc = new Discord.Client();
const { registerPeople } = require('./utils/register');
registerPeople(dc, 'people');


dc.login(process.env.TOKEN);