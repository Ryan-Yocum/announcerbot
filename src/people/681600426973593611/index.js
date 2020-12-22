const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

module.exports.run = async (dc, oldState, newState) => {
  console.log('Hello World');
  const conn = await newState.channel.join();
  let dir = path.join(__dirname, 'clips');
  let files = await fsp.readdir(dir);
  let file = files[Math.floor(Math.random() * files.length)]
  conn.play(fs.createReadStream(path.join(dir, file)), { volume: 0.5 });
  setTimeout(() => {
    conn.disconnect();
  }, 10000);
}