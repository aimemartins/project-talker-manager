const fs = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '..', 'src', 'talker.json');

async function getAllTalkers() {
  try {
    const response = await fs.readFile(talkersPath, 'utf8');
    // console.log(typeof response);
    const reString = JSON.parse(response);
    // console.log(typeof reString);
    return reString;
  } catch (err) {
    console.log(err.message);
  }
}

async function getId(id) {
  // console.log(typeof id);
    const response = await fs.readFile(talkersPath, 'utf8');
    const reString = JSON.parse(response);
    const findId = reString.find((talker) => talker.id === id);
    // console.log(findId);
   if (!findId) {
    throw new Error('Pessoa palestrante não encontrada');
   } else {
    return findId;
   }
}

module.exports = {
  getAllTalkers,
  getId,
};
