const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const talkersPath = path.resolve(__dirname, '..', 'src', 'talker.json');

// Requisito 1 
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
// getAllTalkers();

// Requisito 2
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

// getId(1);

// Requisito 3 

  function handleToken(email, password) {
  if (email && password) {
    const generateToken = crypto.randomBytes(8).toString('hex');
    console.log(typeof generateToken);
    return generateToken;
  } 
}

 // handleToken('aime@gmail.com', '123456');

 async function createTalker(name, age, watchedAt, rate) {
  const read = await getAllTalkers();
  // console.log(read);
  const newTalker = {
    name,
    age,
    id: read[read.length - 1].id + 1,
    talk: {
      watchedAt,
      rate,
    },
  };

  const addTalker = JSON.stringify([...read, newTalker], null, 2);
   console.log(addTalker);

  const writeNewTalker = await fs.writeFile(talkersPath, addTalker);
  // console.log(writeNewTalker); DÚVIDA? eu consigo fazer um console em um  arquivo fs?
  return writeNewTalker;
 }

// createTalker('joao', 30, 'hdd', 'jhdjf');

module.exports = {
  getAllTalkers,
  getId,
  handleToken,
  createTalker,
};
