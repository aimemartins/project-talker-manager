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
    // console.log(typeof generateToken);
    return generateToken;
  } 
}

 // handleToken('aime@gmail.com', '123456');

 // Requisito 5

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
  // console.log('string', newTalker);
  // const jsonNewTalker = JSON.stringify(newTalker);
  // console.log('json', jsonNewTalker);
  const addTalker = JSON.stringify([...read, newTalker], null, 2);

   await fs.writeFile(talkersPath, addTalker);
  return newTalker;
 }

// createTalker('aime', 30, 'hdd', 'jhdjf');

async function editTalker(id, name, age, talk) {
  const readTalkers = await getAllTalkers();
  // console.log(readTalkers); // retorna toda a lista de talkers
  const update = readTalkers.find((talker) => talker.id === Number(id));
  const index = readTalkers.indexOf(update);
 
  const newTalker = { name, age, id: Number(id), talk };
  readTalkers.splice(index, 1, newTalker);
 const re = JSON.stringify(readTalkers, null, 2);
  await fs.writeFile(talkersPath, re);
  // console.log(update); // retorna o objeto que tem o id igual ao que vem da requisição

  return newTalker; 
}
// editTalker(1, 'aime', 32, 'dfdjf', 'dff');
async function deleteTalker(id) {
  const list = await getAllTalkers();
  const find = list.filter((talker) => talker.id !== Number(id)); // filtre tudo que não for o id passado;
  const whatLeft = JSON.stringify(find, null, 2);
  await fs.writeFile(talkersPath, whatLeft);
  return whatLeft;
}

async function searchTalker(q) {
  const list = await getAllTalkers();
  const filter = list.filter((elem) => elem.name.includes(q));
  // console.log(filter);
  if (filter === undefined) {
    return list;
    } if (!filter) {
     return [];
    } 
    return filter;
}

searchTalker('Ric');

module.exports = {
  getAllTalkers,
  getId,
  handleToken,
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
};
