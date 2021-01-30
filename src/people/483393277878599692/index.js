const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

module.exports.run = async (dc, oldState, newState) => {
  const conn = await newState.channel.join();
  let dir = path.join(__dirname, 'clips');
  let files = await fsp.readdir(dir);
  let file = files[Math.floor(Math.random() * files.length)]
  await sleep(1000);
  conn.play(fs.createReadStream(path.join(dir, file)), { volume: 0.5 });
  await sleep(10000);
  conn.disconnect();
}