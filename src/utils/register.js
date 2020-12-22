const fsp = require('fs').promises;
const path = require('path');

async function registerPeople(dc, dir = `../people`) {
  let files = await fsp.readdir(path.join(__dirname, dir));
  files.forEach(async (file) => {
    let stat = await fsp.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      dc.people.set(file, require(path.join(__dirname, dir, file, 'index.js')))
    }
  })
}

module.exports = {
  registerPeople
}