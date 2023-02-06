const fs = require('fs').promises;
// const path = require('path');

// const talkersPath = path.resolve(__dirname, '.', 'talker.json');

async function getAllTalkers() {
  try {
    const response = await fs.readFile('src/talker.json', 'utf8');
    // console.log(typeof response);
    const reString = JSON.parse(response);
    // console.log(typeof reString);
    return reString;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getAllTalkers,
};
